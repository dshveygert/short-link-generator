#!/bin/bash
set -e

# Конфигурация
REPO_URL="git@github.com:dshveygert/short-link-generator.git"
SERVICE_NAME="short-link-generator"
APP_NAME="short-link-generator"
PORT="4091"

# Папки
RELEASES_BASE="/var/arny/releases"
WWW_BASE="/var/www"
CONFIG_DIR="/var/arny/configs/short-link-generator"

KEEP_RELEASES=3

# Проверяем что pnpm установлен
if ! command -v pnpm &> /dev/null; then
    echo "❌ ERROR: pnpm is not installed"
    exit 1
fi

# Проверяем аргументы
if [ -z "$1" ]; then
    echo "Usage: $0 <branch-or-tag>"
    exit 1
fi

TARGET_BRANCH="$1"
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
RELEASE_DIR="${RELEASES_BASE}/${SERVICE_NAME}/${TIMESTAMP}"
CURRENT_LINK="${WWW_BASE}/${SERVICE_NAME}/current"

echo "🚀 Starting deployment of $SERVICE_NAME"

# ==============================================================================
# STEP 1: Prepare directory
# ==============================================================================
echo ">>> Creating release directory..."
mkdir -p "$RELEASE_DIR"
cd "$RELEASE_DIR"

# ==============================================================================
# STEP 2: Clone repository
# ==============================================================================
echo ">>> Cloning repository..."
git clone --branch "$TARGET_BRANCH" --depth 1 "$REPO_URL" .

# ==============================================================================
# STEP 3: Install dependencies
# ==============================================================================
echo ">>> Installing dependencies..."
pnpm install --frozen-lockfile

# ==============================================================================
# STEP 4: Build application (if needed) - УЛУЧШЕННАЯ ПРОВЕРКА
# ==============================================================================
echo ">>> Checking build configuration..."
if [ -f "package.json" ] && grep -q "\"build\"" package.json; then
    echo ">>> Building application..."
    pnpm build

    # ПРОВЕРЯЕМ что сборка прошла успешно
    if [ -d "dist" ] && [ -f "dist/index.js" ]; then
        echo "✅ Build successful - dist/index.js exists"
    else
        echo "❌ BUILD FAILED: dist/index.js not found after build"
        echo "📁 Contents of release directory:"
        ls -la
        echo "📁 Looking for possible entry points:"
        find . -name "*.js" -type f | grep -v node_modules | head -10
        exit 1
    fi
else
    echo "ℹ️ No build script found, using source files directly"
    # Проверяем есть ли точка входа в src или корне
    if [ -f "src/index.js" ]; then
        echo "✅ Found src/index.js"
    elif [ -f "index.js" ]; then
        echo "✅ Found index.js"
    else
        echo "❌ ERROR: No entry point found (dist/index.js, src/index.js, or index.js)"
        ls -la
        exit 1
    fi
fi

# ==============================================================================
# STEP 5: Install production dependencies
# ==============================================================================
echo ">>> Installing production dependencies..."
pnpm install --prod --frozen-lockfile

# ==============================================================================
# STEP 6: Copy environment file
# ==============================================================================
echo ">>> Copying environment configuration..."
if [ -f "$CONFIG_DIR/.env" ]; then
    cp "$CONFIG_DIR/.env" "$RELEASE_DIR/.env"
    echo "✅ .env copied to release directory"
else
    echo "❌ ERROR: .env file not found in $CONFIG_DIR"
    exit 1
fi

echo ">>> Setting NODE_ENV for envalid..."

if [ -f "dist/index.js" ]; then
    MAIN_FILE="dist/index.js"
else
    echo "❌ Main (dist/index.js) file not found"
    exit 1
fi

sed -i '1i process.env.NODE_ENV = "production";' "$MAIN_FILE"

echo "✅ NODE_ENV forced to production"

# ==============================================================================
# STEP 7: Update symlink
# ==============================================================================
echo ">>> Updating current symlink..."
mkdir -p "$(dirname "$CURRENT_LINK")"
ln -sfn "$RELEASE_DIR" "$CURRENT_LINK"

# ==============================================================================
# STEP 8: Restart/start PM2 - УЛУЧШЕННЫЙ ЗАПУСК
# ==============================================================================
echo ">>> Managing PM2 process..."

# Определяем точку входа для запуска
if [ -f "$CURRENT_LINK/dist/index.js" ]; then
    START_COMMAND="node dist/index.js"
elif [ -f "$CURRENT_LINK/src/index.js" ]; then
    START_COMMAND="node src/index.js"
elif [ -f "$CURRENT_LINK/index.js" ]; then
    START_COMMAND="node index.js"
else
    echo "❌ ERROR: No entry point found for PM2"
    exit 1
fi

echo "📝 Using start command: $START_COMMAND"

if pm2 id "$APP_NAME" > /dev/null 2>&1; then
    echo "🔄 Restarting PM2 process: $APP_NAME"
    pm2 delete "$APP_NAME"
fi

echo "🆕 Starting PM2 process: $APP_NAME"
cd "$CURRENT_LINK"
pm2 start "$START_COMMAND" --name "$APP_NAME" --cwd "$CURRENT_LINK"
pm2 save

# ==============================================================================
# STEP 9: Cleanup old releases
# ==============================================================================
echo ">>> Cleaning old releases..."
cd "${RELEASES_BASE}/${SERVICE_NAME}"
find . -maxdepth 1 -type d -name "20*" | sort -r | tail -n +$((KEEP_RELEASES+1)) | while read -r dir; do
    echo "Removing old release: $dir"
    rm -rf "$dir"
done

# ==============================================================================
# STEP 10: Verification
# ==============================================================================
echo ">>> Verifying deployment..."
sleep 5

echo "--- PM2 Status ---"
pm2 list | grep "$APP_NAME"

echo "--- Application Health ---"
if curl -f http://localhost:$PORT/health > /dev/null 2>&1; then
    echo "✅ Health check PASSED"
else
    echo "⚠️ Health check FAILED"
    echo "Check logs: pm2 logs $APP_NAME --lines 20"
fi

echo "🎉 Links service deployment completed!"
echo "📁 Release: $RELEASE_DIR"
echo "🔗 Current: $CURRENT_LINK"
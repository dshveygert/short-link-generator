import dotenv from "dotenv";
import { cleanEnv, host, num, port, str, testOnly } from "envalid";

const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.local';

dotenv.config({ path: envFile });

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ devDefault: testOnly("test"), choices: ["development", "production", "test"] }),
  HOST: host({ devDefault: testOnly("localhost") }),
  PORT: port({ devDefault: testOnly(3000) }),
  CORS_ORIGIN: str({ devDefault: testOnly("http://localhost:3000") }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(10000) }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(10000) }),
  POSTGRES_HOST: host({ devDefault: testOnly("localhost") }),
  POSTGRES_PORT: port({ devDefault: testOnly(5432) }),
  POSTGRES_USER: str({ devDefault: testOnly("USER") }),
  POSTGRES_PASSWORD: str({ devDefault: testOnly("PASSWORD") }),
  POSTGRES_DB: str({ devDefault: testOnly("DB") }),
  APP_CONFIG_DOMAIN: str({ devDefault: testOnly("localhost") }),
});

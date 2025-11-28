import { env } from "@/common/utils/envConfig";
import {logger} from "@/server";

/**
 * Development logger that works based on env.NODE_ENV
 * Uses pretty console output only in development mode.
 */

const isDev = env.NODE_ENV === "development";
const isProd = env.NODE_ENV === "production";

export const devLog = (...args: any[]) => {
    if (isDev) {
        const timestamp = new Date().toISOString();
        // eslint-disable-next-line no-console
        console.log(`[DEV LOG] ${timestamp}:`, ...args);
    }
};

export const devWarn = (...args: any[]) => {
    if (isDev) {
        const timestamp = new Date().toISOString();
        // eslint-disable-next-line no-console
        console.warn(`[DEV WARN] ${timestamp}:`, ...args);
    }
};

export const devError = (...args: any[]) => {
    if (isDev) {
        const timestamp = new Date().toISOString();
        // eslint-disable-next-line no-console
        console.error(`[DEV ERROR] ${timestamp}:`, ...args);
    }
};

export const prodLog = (dataObject: {[key: string | number | symbol]: unknown}) => {
    if (isProd) {
        const timestamp = new Date().toISOString();
        logger.debug({
            name: `[PROD LOG] ${dataObject?.name ? dataObject.name : ''} ${timestamp}`,
            ...dataObject
        });
    }
};
import type { Request } from "express";
import { rateLimit } from "express-rate-limit";

import { env } from "@/common/utils/envConfig";

const isInternalRequest = (req: Request): boolean => {
  const ip = req.ip ?? "";
  return ip === "127.0.0.1" || ip === "::1" || ip === "::ffff:127.0.0.1";
};

const rateLimiter = rateLimit({
  legacyHeaders: true,
  limit: env.COMMON_RATE_LIMIT_MAX_REQUESTS,
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  windowMs: 15 * 60 * env.COMMON_RATE_LIMIT_WINDOW_MS,
  keyGenerator: (req: Request) => req.ip as string,
  skip: (req) => isInternalRequest(req),
});

export default rateLimiter;

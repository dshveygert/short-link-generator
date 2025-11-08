import db from "@/common/utils/dataSource";
import type { NextFunction, Request, Response } from "express";

export const dbCheckMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Test the database connection
    await db.raw("SELECT 1+1 AS result");
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Database connection error" });
  }
};

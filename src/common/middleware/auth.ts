// import { DBUser } from "@/api/user/userModel";
import type {NextFunction, Request, Response} from "express";
// import { StatusCodes } from "http-status-codes";
// import jwt from "jsonwebtoken";

// export type JwtPayload = {
//   uuid: string;
//   iat: number;
//   exp: number;
//   [key: string]: unknown;
// };
//
// const JWT_SECRET = process.env.JWT_SECRET!;

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    next();
    // const authHeader = req.headers.authorization;
    // if (!authHeader?.startsWith("Bearer ")) {
    //   return res.status(StatusCodes.UNAUTHORIZED).json({ message: "No token" });
    //   // return ServiceResponse.failure("No Link found", null, StatusCodes.NOT_FOUND);
    // }
    //
    // const token = authHeader.split(" ")[1];
    //
    // try {
    //   const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    //
    //   if (payload.uuid && payload.uuid.length === 36 && payload.uuid.split("-")?.length === 5) {
    //     const user = await DBUser.query().select("userId", "uuid").where("uuid", payload.uuid).first();
    //
    //     // console.log("user", user);
    //
    //     if (!user) {
    //       return res.status(StatusCodes.UNAUTHORIZED).json({ message: "User not found..." });
    //     }
    //
    //     (req as any).params.userId = user.userId;
    //     (req as any).params.userUUID = user.uuid;
    //     next();
    //   } else {
    //     return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid request..." });
    //   }
    // } catch {
    //   return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid token..." });
    // }
}

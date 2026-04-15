import { NextFunction, Request, Response } from "express";
export declare enum UserRole {
    ADMIN = "ADMIN",
    PROVIDER = "PROVIDER",
    CUSTOMER = "CUSTOMER"
}
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                name: string;
                role: string;
                emailVerified: boolean;
                status: string;
            };
        }
    }
}
declare const auth: (...roles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default auth;
//# sourceMappingURL=auth.d.ts.map
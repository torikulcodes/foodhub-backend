import { NextFunction, Request, Response } from "express";
declare function errorHandler(err: any, req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export default errorHandler;
//# sourceMappingURL=globalErrorHandler.d.ts.map
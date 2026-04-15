declare class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor(message: string, statusCode?: number);
}
export default AppError;
//# sourceMappingURL=app.error.d.ts.map
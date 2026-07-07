import { Request, Response, NextFunction } from 'express';
export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
    };
}
export declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => any;
export declare const roleMiddleware: (...roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => any;
export declare const errorHandler: (err: any, _req: Request, res: Response, _next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map
import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare const register: (req: AuthRequest, res: Response) => Promise<any>;
export declare const login: (req: AuthRequest, res: Response) => Promise<any>;
export declare const getProfile: (req: AuthRequest, res: Response) => Promise<any>;
export declare const updateProfile: (req: AuthRequest, res: Response) => Promise<void>;
export declare const googleAuth: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=authController.d.ts.map
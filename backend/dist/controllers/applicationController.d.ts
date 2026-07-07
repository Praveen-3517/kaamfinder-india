import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare const getMyApplications: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getJobApplications: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateApplicationStatus: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getApplicationStats: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=applicationController.d.ts.map
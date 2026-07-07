import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare const getAllJobs: (req: AuthRequest, res: Response) => Promise<any>;
export declare const getNearbyJobs_Controller: (req: AuthRequest, res: Response) => Promise<any>;
export declare const searchJobs: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getJobById: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createJob: (req: AuthRequest, res: Response) => Promise<any>;
export declare const updateJob: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteJob: (req: AuthRequest, res: Response) => Promise<void>;
export declare const applyJob: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=jobController.d.ts.map
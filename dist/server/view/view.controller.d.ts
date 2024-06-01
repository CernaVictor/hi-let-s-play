import { Request, Response } from 'express';
import { ViewService } from './view.service';
export declare class ViewController {
    private viewService;
    constructor(viewService: ViewService);
    staticGet(req: Request, res: Response): void;
    staticPost(req: Request, res: Response): void;
}

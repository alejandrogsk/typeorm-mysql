import {Request, Response} from 'express';


export const indexWelcome = (req: Request, res: Response): Response => {
    return res.json('Todos API')
}



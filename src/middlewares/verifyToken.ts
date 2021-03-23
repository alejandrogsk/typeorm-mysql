import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import key from '../private.keys';
interface IPayload {
	id: number;
	iat: number;
	exp: number;
}

  
const verifyToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.header("x-token");
		if (!token) return res.json({ok:false, message:"Access denied, you should authenticate"});

        const payload = jwt.verify(
            token,
            key.jwtPrivateKey || "someKey"
        ) as IPayload;
            /**
             * for userId to work it was necessary to configure the types.d.ts
             * file and also add it to the end of the tsconfig.json file
            */
        req.userId = payload.id
		next();
		
	} catch (err) {
		res.json({ ok: false, message: "token is required" });
	}
};

export default verifyToken;
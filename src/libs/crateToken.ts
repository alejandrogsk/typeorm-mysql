import jwt from 'jsonwebtoken';
import key from '../private.keys';

export default function(userId: number | undefined ): string | undefined  {
    if(key.jwtPrivateKey){
        const token: string = jwt.sign(
            {
                id: userId
            }, key.jwtPrivateKey,
            { expiresIn: 60 * 60 * 24 }
        );
        return token
    }
}
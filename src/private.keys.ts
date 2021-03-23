import dotenv from 'dotenv';
dotenv.config()

export default {
    jwtPrivateKey: process.env.TOKEN_SECRET,
}


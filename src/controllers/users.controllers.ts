import {Request, Response} from 'express';
import {getRepository, getManager} from 'typeorm';
//Password functions
import {encriptPassword, validatePassword} from '../libs/bcrypt.password';
//Interface
import {UserAttributes} from '../interface/entries.attributes';

import {UserEntity} from '../entity/users.entity';
//Token 
import crateToken from '../libs/crateToken';


//REGISTER USER '/auth/register'
export const registerUser = async (req: Request, res: Response) => {
    const entityManager = getManager();

    //get the data
    const data = req.body;

    //verify if user already exists
        const checkIfUserExists = await entityManager.find(UserEntity, {email: data.email})
        if( checkIfUserExists.length > 0 ) return res.json({ok: false, msg: "User already exists"})
    //end verification

    //encript password
    const encriptedPassword = await encriptPassword(data.password);
    
    //set encripted password
    data.password = encriptedPassword;

    //create users
    const user = entityManager.create(UserEntity, data);
    const saveUser: UserAttributes = await entityManager.save(user);

    const token = crateToken(saveUser.id);
 
    res.json({ok: true, saveUser, token});

}

//LOGIN USER '/auth/login'
export const loginUser = async(req: Request, res: Response) => {
    const entityManager = getManager();
    const {email, password} = req.body;
    try{
        //Find user with this email
        const findUser = await entityManager.find(UserEntity, { email });

        if(findUser.length !== 1) return res.json({ok: false, msg: "It seems there was a problem finding the user"});

        const user: UserAttributes = findUser[0];
        
        //get password from user in db
        const userPassword = user.password

        //validate password
        const isValid = await validatePassword(password, userPassword)

        if(!isValid) return res.json({ok: false, msg: 'Incorrect Password'})

        //generate a token
        const token: string | undefined = crateToken(user.id);

        return res.json({ok: true, user, token});
    
    } catch(e) {
        console.log('error console.log', e)
        return res.json({msg: 'seems to be an error'})
    }

    
}


//PUT update one '/auth/profile'
export const updateProfile = async (req: Request, res: Response) => {
    //From TypeORM
    const entityManager = getManager();
    //id from token to find the user 
    const id = req.userId;
    //data to update
    const data = req.body;
    //Token
    const token = req.header("x-token");


    //if user is changing his password, we need encrypt it, before save it.
    if(data.password) {
        //encript password
        const encriptedPassword = await encriptPassword(data.password);
        //Update Profile
        await entityManager.update(UserEntity, id, {...data, password: encriptedPassword});
        //find updated user
        const findUser = await entityManager.find(UserEntity, {id});
        if(findUser.length !== 1) return res.json({ok: false, msg:"Seems to be an error on updateProfile"});
        //Get the first element in the array
        const user: UserAttributes = findUser[0];
        
        return res.json({ok: true, user, token});  
    } 

    //Update Profile
    await entityManager.update(UserEntity, id, data);

    //find updated user
    const findUser = await entityManager.find(UserEntity, {id});
    if(findUser.length !== 1) return res.json({ok: false, msg:"Seems to be an error on updateProfile"});
    //Get the first element in the array
    const user: UserAttributes = findUser[0];

    return res.json({ok: true, user, token});   
}


//DELETE user  '/auth/profile'
export const deleteProfile = async ( req: Request, res: Response ): Promise<Response> => {
    //find user by id with the token
    const id = req.userId;

    const entityManager = getManager();

    try {
        await entityManager.delete(UserEntity, id);
        return res.json({ok: true, msg: 'User has been deleted'})
    } catch (e) {
        throw new Error(e);
    }
}


//GET profile '/auth/profile'
export const profileUser = async (req: Request, res: Response) => {
	const entityManager = getManager();
    const token = req.header("x-token");

    const id = req.userId;

    const findUser = await entityManager.find(UserEntity, {id})
    
    if(findUser.length !== 1) return res.json({ok: false, msg: "It seems there was a problem finding the user"});

    const user: UserAttributes = findUser[0];



	return res.json({
		ok: true,	
		user,
		token
	});
    
};


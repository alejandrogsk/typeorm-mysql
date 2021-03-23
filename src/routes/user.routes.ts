import { Router } from 'express';
import  verifyToken  from '../middlewares/verifyToken';
import { registerUser, loginUser, profileUser, updateProfile, deleteProfile } from '../controllers/users.controllers';

const router = Router();

//Register
router.post('/register', registerUser);
//Login
router.post('/login', loginUser);


router.route('/profile')
    .get(verifyToken, profileUser) //GetProfile
    .put(verifyToken, updateProfile) //UpdateProfile
    .delete(verifyToken, deleteProfile) //DeleteProfil

export default router

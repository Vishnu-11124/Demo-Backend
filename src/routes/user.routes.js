import { Router } from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js'
import { veriyJWT } from '../middlewares/auth.middleware.js';


const router = Router();

router.post('/register', upload.fields([ 
    {
        name: 'avatar',
        maxCount: 1
    },
    {
        name: 'coverImage',
        maxCount: 1
    }
]), registerUser);

router.post('/login', loginUser);

router.post('/logout', veriyJWT, logoutUser);



export default router;
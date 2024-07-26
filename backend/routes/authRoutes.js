import express from 'express'
import { alluserController, loginController, registerController, updateController } from '../controller/authController.js';
import {requireSignIn} from '../middleware/authMiddleware.js';
const router = express.Router();



router.post('/register', registerController);

router.post('/login', loginController);

router.put('/update/:id', updateController)

router.get('/allusers',  alluserController)



export default router;
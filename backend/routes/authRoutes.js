import express from 'express'
import { alluserController, generateQR, loginController, QRCodedata, registerController, updateController } from '../controller/authController.js';
import {requireSignIn} from '../middleware/authMiddleware.js';
const router = express.Router();



router.post('/register', registerController);

router.post('/login', loginController);

router.put('/update/:id', requireSignIn, updateController)

router.post('/generateQR',  generateQR);

router.get('/generateQR', QRCodedata);

router.get('/allusers',  alluserController);



export default router;
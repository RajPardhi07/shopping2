import express from 'express'
import { alluserController, deleteQRCode, editQRCode, editUserData, generateQR, loginController, QRCodedata, registerController } from '../controller/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
const router = express.Router();



router.post('/register', registerController);

router.post('/login', loginController);


router.post('/generateQR',  generateQR);

router.put('/editCode/:id', editQRCode);

router.put('/editUser/:id', editUserData);

router.get('/generateQR', QRCodedata);

router.delete('/deletecode/:id', deleteQRCode);

router.get('/allusers', requireAuth,  alluserController);



export default router;
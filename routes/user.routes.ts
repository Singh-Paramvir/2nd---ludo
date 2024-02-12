import { verify } from 'crypto';
import express from 'express';

 import userController from "../controllers/user.controller";

const router=express.Router();
// api to send otp on mobile number
 router.post("/sendotptomobile",userController.sendotptomobile)
 router.post("/resendotp",userController.resendOtp)
// otp verified
router.post("/verifyotp",userController.verifyOtp)
router.post("/adminlogin",userController.adminLogin)
router.post("/getdeviceId",userController.getDeviceId)
router.post("/getmatrics", userController.getMatrics)
router.post("/gmbydate",userController.gmbydate)
router.post("/todaygm",userController.todaygm)




// api to add user
router.post("/test",userController.test)
router.post("/sendotp",userController.sendOtp)
export default router;


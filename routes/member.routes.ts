import { verify } from 'crypto';
import express from 'express';

 import userController from "../controllers/user.controller";
 

const router=express.Router();
// update profile
 router.post("/updateprofile",userController.updateProfile)
 router.post("/updateavatar",userController.updateAvatar) // update avatar
 router.post("/getprofile",userController.getProfile)   // on socket
 router.post("/addkyc",userController.addKyc)
 router.post("/addperfor",userController.addPerFor)
 router.post("/getperfor",userController.getPerFor)
 router.post("/addbankdetail",userController.addBankDetail)
 router.post("/addroom",userController.addRoom)
 router.post("/addfriend",userController.addFriend)
 router.post("/getrequest",userController.getRequest)   // on socket
 router.post("/getfriends",userController.getFriends)    // on socket
 router.post("/acceptrequest",userController.acceptRequest)
 router.post("/declinereq",userController.declineRequesr)
 router.post("/addticket",userController.addTicket)
 router.post("/gettickethis",userController.getTicHis)
 router.post("/addquery",userController.addQuery)
 router.post("/getallquery",userController.getQuery)
 router.post("/withdraw",userController.withDraw) // withdraw
 router.post("/getwithdrawhistory",userController.getHistory)
 router.post("/getuiinfo",userController.getUiInfo)
 router.post("/addId",userController.checkUser)  
 router.post("/addad",userController.addad) 
 router.post("/extraadd",userController.extraAdd) 
 router.post("/geteadata",userController.geteadata) 
 router.post("/updateactive",userController.updateActive) 

  
export default router;  
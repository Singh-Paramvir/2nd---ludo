import { verify } from 'crypto';
import express from 'express';

import userController from "../controllers/user.controller";
import AdminController from "../controllers/admin.controller"

const router = express.Router();

router.post("/getslotes", AdminController.getSlotes)
router.post("/updateslotes", AdminController.updateSlotes)
// add slote
router.post("/addslote", AdminController.addslote)
router.post("/deleteslote", AdminController.deleteslote)
router.post("/deleteuser", AdminController.deleteuser)
router.post("/getalluser", AdminController.getAllUser)
router.post("/usercount", AdminController.userCount)
router.post("/matchcount", AdminController.matchCount)
router.post("/getpendingwithdraw", AdminController.gpw)
router.post("/deleterequest", AdminController.deleteRequest)
router.post("/approverequest", AdminController.approveRequest)
router.post("/getapproverequest", AdminController.getapproveRequest)
router.post("/getsocial", AdminController.getSocial)
router.post("/updatesocial", AdminController.updateSocial)
router.post("/updateseg", AdminController.updateseg)
router.post("/getseg", AdminController.getseg)
router.post("/getperfor", AdminController.getperfor)
router.post("/getuserhis", AdminController.getuserhis)
router.post("/cpm", AdminController.cpm)
router.post("/getadddata", AdminController.getadddata)
router.post("/ued", AdminController.ued)
export default router;  
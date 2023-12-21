import { Request, Response } from 'express';
import AdminCodeController from './service/adminCode.controller';
import commonController from './common/common.controller';
import { sign, verify } from 'crypto';
// import userController from "../controllers/user.controller";

class AdminController{
 
    async getSlotes(req: Request, res: Response) {
        try {
            const admin = req?.user?.admin;
            const id =req?.user?.id;
            const {data}= req.body;
         
            if(admin == true){
                  await AdminCodeController.adminDetail({id, data }, res)
                  

            }else{
                commonController.errorMessage("Please Provide Admin Email or Password",res)
            }
          
        } catch (e) {
            commonController.errorMessage("admin not login", res)

        }
    }
    async updateSlotes(req: Request, res: Response) {
        try {
            const admin = req?.user?.admin;
            const Id =req?.user?.id;
            const {rupees,players,time,id,first,second,third,fourth,totalPlay,timeToPlay}= req.body;
         
            if(admin == true){
                  await AdminCodeController.updateSlotes({rupees,players,time,id,first,second,third,fourth,totalPlay,timeToPlay}, res)
                  

            }else{
                commonController.errorMessage("Please Provide Admin Email or Password",res)
            }
          
        } catch (e) {
            commonController.errorMessage("admin not login", res)

        }
    }
   async addslote(req: Request, res: Response) {
    try {
        const admin = req?.user?.admin;
        const Id =req?.user?.id;
        const {addplayer1,addrupee1,addtime1,type,first,second,third,fourth}= req.body;
        console.log(addplayer1,addrupee1,addtime1,"body here");
        
     
        if(admin == true){
              await AdminCodeController.addslote({addplayer1,addrupee1,addtime1,type,first,second,third,fourth}, res)
              

        }else{
            commonController.errorMessage("Please Provide Admin Email or Password",res)
        }
      
    } catch (e) {
        commonController.errorMessage("admin not login", res)

    }
}
   async deleteslote(req: Request, res: Response) {
    try {
        const admin = req?.user?.admin;
        const Id =req?.user?.id;
        const {id}= req.body;
        console.log(id,"body here");
        
     
        if(admin == true){
              await AdminCodeController.deleteslote({id}, res)
              

        }else{
            commonController.errorMessage("Please Provide Admin Email or Password",res)
        }
      
    } catch (e) {
        commonController.errorMessage("admin not login", res)

    }
}
async deleteuser(req: Request, res: Response) {
    try {
        const admin = req?.user?.admin;
        const Id =req?.user?.id;
        const {id}= req.body;
        console.log(id,"body here");
        
     
        if(admin == true){
              await AdminCodeController.deleteuser({id}, res)
              

        }else{
            commonController.errorMessage("Please Provide Admin Email or Password",res)
        }
      
    } catch (e) {
        commonController.errorMessage("admin not login", res)

    }
}
async getAllUser(req: Request, res: Response) {
    try {
      const admin = req?.user?.admin;
        const Id =req?.user?.id;     
        const {buttonValue}= req.body;
        if(admin == true){
              await AdminCodeController.getAllUser({Id,buttonValue}, res)
              

        }else{
            commonController.errorMessage("Please Provide Admin Email or Password",res)
        }
      
    } catch (e) {
        commonController.errorMessage("admin not login", res)

    }
}
async userCount(req: Request, res: Response) {
    try {
        const admin = req?.user?.admin;
        const Id =req?.user?.id;     
         const {date,SegId}=req.body;
        if(admin == true){
              await AdminCodeController.userCount({Id,date,SegId}, res)
              

        }else{
            commonController.errorMessage("Please Provide Admin Email or Password",res)
        }
      
    } catch (e) {
        commonController.errorMessage("admin not login", res)

    }
}
async matchCount(req: Request, res: Response) {
    try {
        const admin = req?.user?.admin;
        const Id =req?.user?.id;     
         const {date,SegId}=req.body;
        if(admin == true){
              await AdminCodeController.matchCount({Id,date,SegId}, res)
              

        }else{
            commonController.errorMessage("Please Provide Admin Email or Password",res)
        }
      
    } catch (e) {
        commonController.errorMessage("admin not login", res)

    }
}
async gpw(req: Request, res: Response) {
    try {
        const admin = req?.user?.admin;
        const Id =req?.user?.id;     
       const{buttonValue} = req.body;
        if(admin == true){
              await AdminCodeController.gpw({Id,buttonValue}, res)
              

        }else{
            commonController.errorMessage("Please Provide Admin Email or Password",res)
        }
      
    } catch (e) {
        commonController.errorMessage("admin not login", res)

    }
}
async deleteRequest(req: Request, res: Response) {
    try {
        const admin = req?.user?.admin;
        const Id =req?.user?.id;     
        const {id} = req.body;
        if(admin == true){
              await AdminCodeController.deleteRequest({Id,id}, res)
              

        }else{
            commonController.errorMessage("Please Provide Admin Email or Password",res)
        }
      
    } catch (e) {
        commonController.errorMessage("admin not login", res)

    }
}
async approveRequest(req: Request, res: Response) {
    try {
        const admin = req?.user?.admin;
        const Id =req?.user?.id;     
        const {id} = req.body;
        if(admin == true){
              await AdminCodeController.approveRequest({Id,id}, res)
              

        }else{
            commonController.errorMessage("Please Provide Admin Email or Password",res)
        }
      
    } catch (e) {
        commonController.errorMessage("admin not login", res)

    }
}
async getapproveRequest(req: Request, res: Response) {
    try {
        const admin = req?.user?.admin;
        const Id =req?.user?.id;     
        const{buttonValue} = req.body;
        if(admin == true){
              await AdminCodeController.getapproveRequest({Id,buttonValue}, res)
              

        }else{
            commonController.errorMessage("Please Provide Admin Email or Password",res)
        }
      
    } catch (e) {
        commonController.errorMessage("admin not login", res)

    }
}
async getSocial(req: Request, res: Response) {
    try {
        const admin = req?.user?.admin;
        const Id =req?.user?.id;     
        const{buttonValue} = req.body;
        if(admin == true){
              await AdminCodeController.getSocial({Id,buttonValue}, res)
              

        }else{
            commonController.errorMessage("Please Provide Admin Email or Password",res)
        }
      
    } catch (e) {
        commonController.errorMessage("admin not login", res)

    }
}
async getseg(req: Request, res: Response) {
    try {
        const admin = req?.user?.admin;
        const Id =req?.user?.id;     
        const{buttonValue} = req.body;
        if(admin == true){
              await AdminCodeController.getseg({Id,buttonValue}, res)
              

        }else{
            commonController.errorMessage("Please Provide Admin Email or Password",res)
        }
      
    } catch (e) {
        commonController.errorMessage("admin not login", res)

    }
}
async getperfor(req: Request, res: Response) {
    try {
        const admin = req?.user?.admin;
        const Id =req?.user?.id;     
        const{buttonValue} = req.body;
        if(admin == true){
              await AdminCodeController.getperfor({Id,buttonValue}, res)
              

        }else{
            commonController.errorMessage("Please Provide Admin Email or Password",res)
        }
      
    } catch (e) {
        commonController.errorMessage("admin not login", res)

    }
}
async getuserhis(req: Request, res: Response) {
    try {
        const admin = req?.user?.admin;
        const Id =req?.user?.id;     
        const{buttonValue,id} = req.body;
        if(admin == true){
              await AdminCodeController.getuserhis({Id,buttonValue,id}, res)
              

        }else{
            commonController.errorMessage("Please Provide Admin Email or Password",res)
        }
      
    } catch (e) {
        commonController.errorMessage("admin not login", res)

    }
}
async cpm(req: Request, res: Response) {
    try {
        const admin = req?.user?.admin;
        const Id =req?.user?.id;     
        const{days} = req.body;
        console.log(days,"body12211");
        
        if(admin == true){
              await AdminCodeController.cpm({Id,days}, res)
              

        }else{
            commonController.errorMessage("Please Provide Admin Email or Password",res)
        }
      
    } catch (e) {
        commonController.errorMessage("admin not login", res)

    }
}
async updateSocial(req: Request, res: Response) {
    try {
        const admin = req?.user?.admin;
        const Id =req?.user?.id;     
        const{ID, instagram,rateUs,termscondition,privancyPolicy,maximum,minimum,withdrawFee,String} = req.body;
        if(admin == true){
              await AdminCodeController.updateSocial({ID,Id,instagram,rateUs,termscondition,privancyPolicy,String,maximum,minimum,withdrawFee}, res)
              

        }else{
            commonController.errorMessage("Please Provide Admin Email or Password",res)
        }
      
    } catch (e) {
        commonController.errorMessage("admin not login", res)

    }
}
async updateseg(req: Request, res: Response) {
    try {
        const admin = req?.user?.admin;
        const Id =req?.user?.id;     
        const{id,percentage} = req.body;
        if(admin == true){
              await AdminCodeController.updateseg({id,percentage}, res)
              

        }else{
            commonController.errorMessage("Please Provide Admin Email or Password",res)
        }
      
    } catch (e) {
        commonController.errorMessage("admin not login", res)

    }
}
  
}

export default new AdminController();
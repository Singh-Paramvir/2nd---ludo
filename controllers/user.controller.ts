import { Request, Response } from 'express';
import codeController from './service/code.controller'
import commonController from './common/common.controller';
import db from "../models"

class UserController {

   
    async sendotptomobile(req: Request, res: Response) {
        try {
           const{mobileNumber,deviceId}=req.body;
           if(!mobileNumber){
            commonController.successMessage({},"Please Provide MobileNumber",res)
           }else{
            await codeController.sendotptomobile({
                mobileNumber,deviceId
            }, res)
        } 
          
        } catch (e) {
            commonController.successMessage({},"user not found", res)
            console.log(e);

        }
    }
 async addad(req: Request, res: Response) {
                try {
                    let id = req?.user?.id;
                   const{show,click}=req.body;
                  
                    await codeController.addad({
                        show,click,id
                    }, res)
                }catch (e) {
                    commonController.errorMessage("user not found", res)
                    console.log(e);
                }    
                } 

         async extraAdd (req: Request, res: Response) {
            try {
                let id = req?.user?.id;
              
              
                await codeController.extraAdd({
                   id
                }, res)
            }catch (e) {
                commonController.errorMessage("user not found", res)
                console.log(e);
            }    
            }      
    async resendOtp(req: Request, res: Response) {
        try {
           const{mobileNumber}=req.body;
           if(!mobileNumber){
            commonController.successMessage({},"Please Provide MobileNumber",res)
           }else{
            await codeController.resendOtp({
                mobileNumber
            }, res)
        } 
          
        } catch (e) {
            commonController.successMessage({},"user not found", res)
            console.log(e);

        }
    }
    async verifyOtp(req: Request, res: Response) {
        try {
           const{mobileNumber,otp}=req.body;
           if(!otp){
            console.log("aaaa");
            
            commonController.successMessage("","Please Provide otp",res)
           }else{
            await codeController.verifyOtp({
                mobileNumber,otp
            }, res)
        } 
          
        } catch (e) {
            commonController.errorMessage("user not found", res)
            console.log(e);

        }
    }
    async adminLogin(req: Request, res: Response) {
        try {
           const{email,password}=req.body;
          
            await codeController.adminLogin({
              email,password
            }, res)
        }catch (e) {
            commonController.errorMessage("user not found", res)
            console.log(e);
        }    
        } 
    async getDeviceId(req: Request, res: Response) {
        try {
           const{deviceId}=req.body;
          
            await codeController.getDeviceId({
              deviceId
            }, res)
        }catch (e) {
            commonController.errorMessage("user not found", res)
            console.log(e);
        }    
        } 
        async checkUser(req: Request, res: Response) {
            try {
                let id = req?.user?.id;
               const{deviceId}=req.body;
              
                await codeController.checkUser({
                    deviceId,id
                }, res)
            }catch (e) {
                commonController.errorMessage("user not found", res)
                console.log(e);
            }    
            } 
    // update profile
    async updateProfile(req: Request, res: Response) {
        try {
            let id = req?.user?.id;
            console.log(id,"mbbmbmbmbm");
            
           const{firstName,lastName,dob}=req.body;
          
            await codeController.updateProfile({
                firstName,lastName,dob,id
            }, res)
        
          
        } catch (e) {
            commonController.errorMessage("user not found", res)
            console.log(e);

        }
    }
    async updateAvatar(req: Request, res: Response) {
        try {
            let id = req?.user?.id;
            console.log(id,"mbbmbmbmbm");
            
           const{avatar}=req.body;
          
            await codeController.updateAvatar({
              id,avatar
            }, res)
        
          
        } catch (e) {
            commonController.errorMessage("user not found", res)
            console.log(e);

        }
    }
    //get user prfile
    async getProfile(req: Request, res: Response) {
        try {
            let id = req?.user?.id;
            console.log(id,"mbbmbmbmbm");
                    
            await codeController.getProfile({
               id
            }, res)
        
          
        } catch (e) {
            commonController.errorMessage("user not found", res)
            console.log(e);

        }
    }
    // get ui info
    async getUiInfo(req: Request, res: Response) {
        try {
            let id = req?.user?.id;
            console.log(id,"mbbmbmbmbm");
            let segId = await db.Users.findOne({
                where:{
                    id
                }
            })
            let SegId = segId.segmentType
                  console.log("segId",SegId);
                     
            await codeController.getUiInfo({
               id,SegId
            }, res)
        
          
        } catch (e) {
            commonController.errorMessage("user not found", res)
            console.log(e);

        }
    }
    async addKyc(req: Request, res: Response) {
        try {
            let id = req?.user?.id;
            console.log(id,"mbbmbmbmbm");
            const{cardName,cardNo}= req.body;
                    
            await codeController.addKyc({
               id,cardName,cardNo
            }, res)
        
          
        } catch (e) {
            commonController.errorMessage("user not found", res)
            console.log(e);

        }
    }
    async addPerFor(req: Request, res: Response) {
        try {
            let id = req?.user?.id;
            console.log(id,"mbbmbmbmbm");
            const{win,lose,draw,leave,amount,position,players,gsId}= req.body;
                    
            await codeController.addPerFor({
               id,win,lose,draw,leave,amount,position,players,gsId
            }, res)
        
          
        } catch (e) {
            commonController.successMessage({},"user not found", res)
            console.log(e);

        }
    }
    async getPerFor(req: Request, res: Response) {
        try {
            let id = req?.user?.id;
                   
            await codeController.getPerFor({
               id,
            }, res)
        
        } catch (e) {
            commonController.successMessage({},"user not found", res)
            console.log(e);

        }
    }
    async addBankDetail(req: Request, res: Response) {
        try {
            let id = req?.user?.id;
            console.log(id,"mbbmbmbmbm");
            const{upiId,bankName,bankAccNo,ifscCode,paytmNo,type}= req.body;
                    
            await codeController.addBankDetail({
               id,upiId,bankName,bankAccNo,ifscCode,paytmNo,type
            }, res)
        
          
        } catch (e) {
            commonController.errorMessage("user not found", res)
            console.log(e);

        }
    }
    async addRoom(req: Request, res: Response) {
        try {
            let id = req?.user?.id;
            console.log(id,"mbbmbmbmbm");
            const{roomId,playerIds,player}= req.body;
                    
            await codeController.addRoom({
               id,roomId,playerIds,player
            }, res)
        
          
        } catch (e) {
            commonController.errorMessage("user not found", res)
            console.log(e);

        }
    }
    async addFriend(req: Request, res: Response) {
        try {
            let id = req?.user?.id;
            console.log(id,"mbbmbmbmbm");
            const{playerId}= req.body;
                    
            await codeController.addFriend({
               id,playerId
            }, res)
        
          
        } catch (e) {
            commonController.errorMessage("user not found", res)
            console.log(e);

        }
    }
    async getRequest(req: Request, res: Response) {
        try {
            let id = req?.user?.unique;
            console.log(id,"mbbmbmbmbm");
              
            await codeController.getRequest({
               id
            }, res)
        
          
        } catch (e) {
            commonController.errorMessage("user not found", res)
            console.log(e);

        }
    }
    async getFriends(req: Request, res: Response) {
        try {
            let id = req?.user?.id;
            console.log(id,"mbbmbmbmbm");
              
            await codeController.getFriends({
               id
            }, res)
        
          
        } catch (e) {
            commonController.errorMessage("user not found", res)
            console.log(e);

        }
    }
    async acceptRequest(req: Request, res: Response) {
        try {
            let id = req?.user?.id;
                const {reqId}= req.body;
            await codeController.acceptRequest({
               id,reqId
            }, res)
        
          
        } catch (e) {
            commonController.errorMessage("user not found", res)
            console.log(e);

        }
    }
    async declineRequesr(req: Request, res: Response) {
        try {
            let id = req?.user?.id;
                const {reqId}= req.body;
            await codeController.declineRequesr({
               id,reqId
            }, res)
        
          
        } catch (e) {
            commonController.errorMessage("user not found", res)
            console.log(e);

        }
    }
    async addTicket(req: Request, res: Response) {
        try {
            let id = req?.user?.id;
                const {gamePlay,type,player}= req.body;
            await codeController.addTicket({
               id,gamePlay,type,player
            }, res)
        
          
        } catch (e) {
            commonController.errorMessage("user not found", res)
            console.log(e);

        }
    }
    //add user query
    async addQuery(req: Request, res: Response) {
        try {
            let id = req?.user?.id;
                const {query}= req.body;
            await codeController.addQuery({
               id,query
            }, res)
        
          
        } catch (e) {
            commonController.errorMessage("user not found", res)
            console.log(e);

        }
    }
    // get query
    async getQuery(req: Request, res: Response) {
        try {
            let id = req?.user?.id;
              
            await codeController.getQuery({
               id,
            }, res)
        
          
        } catch (e) {
            commonController.errorMessage("user not found", res)
            console.log(e);

        }
    }
    // widthdraw money
    async withDraw(req: Request, res: Response) {
        try {
            let id = req?.user?.id;
                const{amount,paymentMethod}=req.body;
                // minimum condition
                let getFee = await db.SocialLinks.findOne({
                    where:{
                        id:1
                    }
                 })
                if(amount >= getFee.minimum){
                    await codeController.withDraw({
                        id,amount,paymentMethod
                     }, res)
                }else{
                    commonController.successMessage({},"minimum value is 2",res)
                }
         
        
          
        } catch (e) {
            commonController.errorMessage("user not found", res)
            console.log(e);

        }
    }
    async getTicHis(req: Request, res: Response) {
        try {
            let id = req?.user?.id;
               
            await codeController.getTicHis({
               id
            }, res)
        
          
        } catch (e) {
            commonController.errorMessage("user not found", res)
            console.log(e);

        }
    }
    // get withdraw history
    async  getHistory(req: Request, res: Response) {
        try {
            let id = req?.user?.id;
               const {status} = req.body
            await codeController.getHistory({
               id,status
            }, res)
        
          
        } catch (e) {
            commonController.errorMessage("data not found", res)
            console.log(e);

        }
    }
    async addUser(req: Request, res: Response) {
        try {
            const{firstName,lastName,mobileNumber,dob}=req.body;
         
                await codeController.addUser({
                    firstName,lastName,mobileNumber,dob
                }, res)
           

           
        } catch (e) {
            commonController.errorMessage("user not found", res)
            console.log(e);

        }
    }


    async sun(files, req, res) {
        const { song_name, paid_or_free, diamond_value } = req.body
        console.log(req.body, "body here")
        console.log(files[0], "firstImage");
        console.log(files[1], "secondImage");

        if (files[1].originalname.match(/\.(mp3)$/)) {
            let addImage = await db.Songs.create({
                song_name, paid_or_free, diamond_value,
                artist_image: files[0].path,
                song_url: files[1].path
            })
            commonController.successMessage(addImage, "data Uploading Successfully", res)
        } else {
            commonController.errorMessage("please upload mp3 file", res)
        }
    }

 // send otp
 async sendOtp(req: Request, res: Response) {
    try {
       
        await codeController.sendotp({
          
        }, res)
    //    }
      
    } catch (e) {
        commonController.errorMessage("user not found", res)
        console.log(e);

    }
}
async test(req: Request, res: Response) {
    try {
     
        await codeController.test({
          
        }, res)
       
      
    } catch (e) {
        commonController.errorMessage("user not found", res)
        console.log(e);

    }
}
async updateImage(req, res) {
    try {
console.log("bsdk hit huge");
        let mb = req?.user?.id;
        
        
      const { avatar } = req.file;
      const {id} = req.body;

      var sun = await db.Advertisements.findOne({
        where: {
          id
        }
      })
      var response = `${req.file.path}`;
      if (sun) {
        
        if (response.match(/\.(png|jpg|jpeg)$/)) {
          await sun.update({ image: "http://54.146.193.129:6000/" + response,});
          commonController.successMessage(req.file.path,"Image Uploaded Successfully", res);

        } else {
          commonController.errorMessage("Please upload png and jpg image file", res);
        }
      } else{
        var sun = await db.Advertisements.create({
            image:"http://54.146.193.129:6000/" + response
          })
          commonController.successMessage(req.file.path,"Image Uploaded Successfully", res);
        
      }

    } catch (e) {
      console.log(e)
      commonController.errorMessage("not upload", res)
    }
  }

}


export default new UserController();
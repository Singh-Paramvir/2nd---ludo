'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
firstName:string;
lastName:Date;
dob:Date;
mobileNumber:string;
avatar:string;
uId:string;
active:boolean;
balance:number;
deviceId:string;
cronDate:Date;
segmentType:number;
totalMatch:number;
winMatch:number;
totalWinning:number
gs1:string;
gs2:string;
gs3:string;
gs4:string;
gs5:string;
EAWatch:number;
gamezopAdd:number;
EAActive:boolean;
EATime:Date;
firstReward:boolean;

}
module.exports = (sequelize:any, DataTypes:any) => {
  class  Users extends Model<UserAttributes>
  implements UserAttributes {
    firstName!:string;
    lastName!:Date;
    dob!:Date;
    mobileNumber!:string;
    avatar!: string;
    uId!: string;
    active!:boolean;
    balance!: number;
    deviceId!: string;
    cronDate!: Date;
    segmentType!:number;
    totalMatch!:number;
    winMatch!:number;
    totalWinning!:number;
    gs1!:string;
    gs2!:string;
    gs3!:string;
    gs4!:string;
    gs5!:string;
    EAWatch!:number;
    gamezopAdd!:number;
EAActive!:boolean;
EATime!:Date;
firstReward!:boolean;
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Users.init({
    firstName:{type:DataTypes.STRING,defaultValue:'User'},
    lastName: {type:DataTypes.DATE},
    dob:{type:DataTypes.DATE},
    mobileNumber:{type:DataTypes.STRING},
    avatar:{type:DataTypes.STRING,defaultValue:0},
    uId:{type:DataTypes.STRING,defaultValue:null},
    active:{type:DataTypes.BOOLEAN},
    balance:{type:DataTypes.DOUBLE,defaultValue:0},
    deviceId:{type:DataTypes.STRING},
    cronDate:{type:DataTypes.DATE},
    segmentType:{type:DataTypes.STRING},
    totalMatch:{type:DataTypes.INTEGER},
    winMatch:{type:DataTypes.INTEGER},
    totalWinning:{type:DataTypes.INTEGER},
    gs1:{type:DataTypes.STRING},
    gs2:{type:DataTypes.STRING},
    gs3:{type:DataTypes.STRING},
    gs4:{type:DataTypes.STRING},
    gs5:{type:DataTypes.STRING},
    EAWatch:{type:DataTypes.INTEGER},
    gamezopAdd:{type:DataTypes.INTEGER},
    EAActive:{type:DataTypes.BOOLEAN},
    EATime:{type:DataTypes.DATE},
    firstReward:{type:DataTypes.BOOLEAN,defaultValue:0}

   
 
  }, {
    sequelize,
    modelName: 'Users', 
  });
  return  Users;
};

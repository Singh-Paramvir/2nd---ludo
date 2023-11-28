'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
firstName:string;
lastName:string;
dob:Date;
mobileNumber:string;
avatar:string;
uId:string;
active:boolean;
balance:number;
deviceId:string;
cronDate:Date;
segmentType:number;

}
module.exports = (sequelize:any, DataTypes:any) => {
  class  Users extends Model<UserAttributes>
  implements UserAttributes {
    firstName!:string;
    lastName!:string;
    dob!:Date;
    mobileNumber!:string;
    avatar!: string;
    uId!: string;
    active!:boolean;
    balance!: number;
    deviceId!: string;
    cronDate!: Date;
    segmentType!:number;
    
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
    lastName: {type:DataTypes.STRING},
    dob:{type:DataTypes.DATE},
    mobileNumber:{type:DataTypes.STRING},
    avatar:{type:DataTypes.STRING,defaultValue:0},
    uId:{type:DataTypes.STRING,defaultValue:null},
    active:{type:DataTypes.BOOLEAN},
    balance:{type:DataTypes.DOUBLE,defaultValue:0},
    deviceId:{type:DataTypes.STRING},
    cronDate:{type:DataTypes.DATE},
    segmentType:{type:DataTypes.INTEGER}

   
 
  }, {
    sequelize,
    modelName: 'Users', 
  });
  return  Users;
};

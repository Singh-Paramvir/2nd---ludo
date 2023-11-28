'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
userId:number;
otp:number;
active:boolean;


}
module.exports = (sequelize:any, DataTypes:any) => {
  class  otp extends Model<UserAttributes>
  implements UserAttributes {
    userId!:number;
    otp!:number;
    active!:boolean;

    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  otp.init({
    userId:{type:DataTypes.INTEGER},
    otp:{type:DataTypes.INTEGER},
    active:{type:DataTypes.BOOLEAN}

   
 
  }, {
    sequelize,
    modelName: 'Otp', 
  });
  return  otp;
};

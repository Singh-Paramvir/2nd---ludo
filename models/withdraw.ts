'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
userId:number;
money:number;
paymentMethod:string;
totalAmount:number;
active:number;
transactionId:string;

}
module.exports = (sequelize:any, DataTypes:any) => {
  class  withdraw extends Model<UserAttributes>
  implements UserAttributes {
    userId!:number;
    money!:number;
    paymentMethod!:string;
    totalAmount!: number;
    active!:number;
    transactionId!: string;

    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  withdraw.init({
    userId:{type:DataTypes.INTEGER},
    money:{type:DataTypes.DOUBLE},
    paymentMethod:{type:DataTypes.STRING},
    totalAmount:{type:DataTypes.DOUBLE},
    active:{type:DataTypes.INTEGER},
    transactionId:{type:DataTypes.STRING}

   
 
  }, {
    sequelize,
    modelName: 'Withdraws', 
  });
  return  withdraw;
};

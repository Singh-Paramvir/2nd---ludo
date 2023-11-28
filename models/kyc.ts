'use strict';
import {
  Model
} from 'sequelize';
interface UserAttributes {
  userId: number;
  cardName: string;
  cardNo: string;
  isApprove:boolean;


}
module.exports = (sequelize: any, DataTypes: any) => {
  class kyc extends Model<UserAttributes>
    implements UserAttributes {
      userId!: number;
      cardName!: string;
      cardNo!: string;
      isApprove!:boolean;


    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  kyc.init({
    userId: { type: DataTypes.INTEGER },
    cardName: { type: DataTypes.STRING },
    cardNo:{type:DataTypes.STRING},
    isApprove:{type:DataTypes.BOOLEAN}




  }, {
    sequelize,
    modelName: 'Kycs',
  });
  return kyc;
};

'use strict';
import {
  Model
} from 'sequelize';
interface UserAttributes {
  percentage: number;
  


}
module.exports = (sequelize: any, DataTypes: any) => {
  class bankDetail extends Model<UserAttributes>
    implements UserAttributes {
      percentage!: number;
   


    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  bankDetail.init({
    percentage: { type: DataTypes.INTEGER }    




  }, {
    sequelize,
    modelName: 'SegPercentage',
  });
  return bankDetail;
};

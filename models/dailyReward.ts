'use strict';
import {
  Model
} from 'sequelize';
interface UserAttributes {
  userId: number;
 rewardAmount:number;


}
module.exports = (sequelize: any, DataTypes: any) => {
  class dailyRewars extends Model<UserAttributes>
    implements UserAttributes {
      userId!: number;
 rewardAmount!:number;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  dailyRewars.init({
    userId: { type: DataTypes.INTEGER },
    rewardAmount:{type:DataTypes.INTEGER,defaultValue:0},
    



  }, {
    sequelize,
    modelName: 'DailyRewards',
  });
  return dailyRewars;
};

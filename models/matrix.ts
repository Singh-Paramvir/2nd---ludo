'use strict';
import {
  Model
} from 'sequelize';
interface UserAttributes {
  todayUsers: number;
  cashAppTotal:number;
  dailyRewardTotal:number;
  totalMatchS1:number;
  totalMatchS2:number;
  totalMatchS3:number;
  totalMatch:number;
  gamezopeTotal:number;
  totalWithdraw:number;

}
module.exports = (sequelize: any, DataTypes: any) => {
  class Matric extends Model<UserAttributes>
    implements UserAttributes {
      todayUsers!: number;
      cashAppTotal!:number;
      dailyRewardTotal!:number;
      totalMatchS1!:number;
      totalMatchS2!:number;
      totalMatchS3!:number;
      totalMatch!:number;
      gamezopeTotal!:number;
      totalWithdraw!:number;
    


    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Matric.init({
    todayUsers: { type: DataTypes.INTEGER },
    cashAppTotal: { type: DataTypes.INTEGER },
    dailyRewardTotal: { type: DataTypes.INTEGER },
    totalMatchS1: { type: DataTypes.INTEGER },
    totalMatchS2: { type: DataTypes.INTEGER },
    totalMatchS3: { type: DataTypes.INTEGER },
    totalMatch: { type: DataTypes.INTEGER },
    gamezopeTotal: { type: DataTypes.INTEGER },
    totalWithdraw:{type:DataTypes.INTEGER}




  }, {
    sequelize,
    modelName: 'Matrics',
  });
  return Matric;
};

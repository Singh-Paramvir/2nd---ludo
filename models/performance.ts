'use strict';
import {
  Model
} from 'sequelize';
interface UserAttributes {
  userId: number;
  win: number;
  lose: number;
  draw: number;
  leave: number
  amount:number;
  position:number;
  players:number;
  gsId:number;



}
module.exports = (sequelize: any, DataTypes: any) => {
  class performance extends Model<UserAttributes>
    implements UserAttributes {
    userId!: number;
    win!: number;
    lose!: number;
    draw!: number;
    leave!: number
    amount!:number;
    position!:number;
    players!: number;
    gsId!:number;
   


    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  performance.init({
    userId: { type: DataTypes.INTEGER },
    win:{type:DataTypes.INTEGER,defaultValue:0},
    lose:{type:DataTypes.INTEGER,defaultValue:0},
    draw:{type:DataTypes.INTEGER,defaultValue:0},
    leave:{type:DataTypes.INTEGER,defaultValue:0},
    amount:{type:DataTypes.INTEGER,defaultValue:0},
    position:{type:DataTypes.INTEGER},
    players:{type:DataTypes.INTEGER},
    gsId:{type:DataTypes.INTEGER}




  }, {
    sequelize,
    modelName: 'Performances',
  });
  return performance;
};

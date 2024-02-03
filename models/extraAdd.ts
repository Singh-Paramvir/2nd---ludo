'use strict';
import {
  Model
} from 'sequelize';
interface UserAttributes {
  time: number;
 amount:number;
 perDay:number;
 countDownTime:number;
 gamezopArray:string;

}
module.exports = (sequelize: any, DataTypes: any) => {
  class ExtraAdd extends Model<UserAttributes>
    implements UserAttributes {
      time!: number;
      amount!:number;
      perDay!:number;
      countDownTime!:number;
      gamezopArray!:string;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ExtraAdd.init({
    time: { type: DataTypes.INTEGER },
    amount:{type:DataTypes.DOUBLE},
    perDay:{type:DataTypes.INTEGER},
    countDownTime:{type:DataTypes.INTEGER},
    gamezopArray:{type:DataTypes.STRING}



  }, {
    sequelize,
    modelName: 'ExtraAdds',
  });
  return ExtraAdd;
};

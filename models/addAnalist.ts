'use strict';
import {
  Model
} from 'sequelize';
interface UserAttributes {
  userId: number;
 show:number;
 click:number;

}
module.exports = (sequelize: any, DataTypes: any) => {
  class addAnalist extends Model<UserAttributes>
    implements UserAttributes {
      userId!: number;
      show!: number;
     click!: number;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  addAnalist.init({
    userId: { type: DataTypes.INTEGER },
    show:{type:DataTypes.INTEGER,defaultValue:0},
    click:{type:DataTypes.INTEGER,defaultValue:0}



  }, {
    sequelize,
    modelName: 'AddAnalists',
  });
  return addAnalist;
};

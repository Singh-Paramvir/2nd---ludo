'use strict';
import {
  Model
} from 'sequelize';
interface UserAttributes {
 image:string


}
module.exports = (sequelize: any, DataTypes: any) => {
  class advertisement extends Model<UserAttributes>
    implements UserAttributes {
     image!: string;


    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  advertisement.init({
   image:{type:DataTypes.STRING}



  }, {
    sequelize,
    modelName: 'Advertisements',
  });
  return advertisement;
};

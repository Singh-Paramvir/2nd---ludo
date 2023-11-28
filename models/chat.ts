'use strict';
import {
  Model
} from 'sequelize';
interface UserAttributes {
  userId: number;
  message: string


}
module.exports = (sequelize: any, DataTypes: any) => {
  class chat extends Model<UserAttributes>
    implements UserAttributes {
    userId!: number;
    message!: string


    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  chat.init({
    userId: { type: DataTypes.INTEGER },
    message: { type: DataTypes.STRING },




  }, {
    sequelize,
    modelName: 'Chat',
  });
  return chat;
};

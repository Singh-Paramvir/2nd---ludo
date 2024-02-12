'use strict';
import {
  Model
} from 'sequelize';
interface UserAttributes {
  onlinePlayer: number;
  s1: number;
  s2: number;
  s3:boolean;


}
module.exports = (sequelize: any, DataTypes: any) => {
  class OnlineUser extends Model<UserAttributes>
    implements UserAttributes {
      onlinePlayer!: number;
      s1!: number;
      s2!: number;
      s3!:boolean;


    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OnlineUser.init({
    onlinePlayer: { type: DataTypes.INTEGER },
    s1: { type: DataTypes.INTEGER },
    s2:{type:DataTypes.INTEGER},
    s3:{type:DataTypes.INTEGER}




  }, {
    sequelize,
    modelName: 'OnlineUsers',
  });
  return OnlineUser;
};

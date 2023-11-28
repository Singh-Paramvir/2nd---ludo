'use strict';
import {
  Model
} from 'sequelize';
interface UserAttributes {
  senderId:string;
  receiverId:string;
  active:boolean;
  date:Date
}
module.exports = (sequelize: any, DataTypes: any) => {
  class friend extends Model<UserAttributes>
    implements UserAttributes {
      senderId!:string;
      receiverId!:string;
      active!:boolean;
      date!:Date
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  friend.init({
    senderId: { type: DataTypes.STRING },
    receiverId: { type: DataTypes.STRING},
    active:{type:DataTypes.BOOLEAN},
    date:{type:DataTypes.DATE}
  }, {
    sequelize,
    modelName: 'FriendReqs',
  });
  return friend;
};

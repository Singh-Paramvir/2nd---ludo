'use strict';
import {
  Model
} from 'sequelize';
interface UserAttributes {
  userId: number;
  roomId: string;
  playerIds:string;
  player:number


}
module.exports = (sequelize: any, DataTypes: any) => {
  class room extends Model<UserAttributes>
    implements UserAttributes {
      userId!: number;
      roomId!: string;
      playerIds!:string;
      player!:number


    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  room.init({
    userId: { type: DataTypes.INTEGER },
    roomId: { type: DataTypes.STRING },
    playerIds: { type: DataTypes.STRING },
    player:{type:DataTypes.INTEGER}



  }, {
    sequelize,
    modelName: 'Rooms',
  });
  return room;
};

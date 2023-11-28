'use strict';
import {
  Model
} from 'sequelize';
interface UserAttributes {
  userId: number;
  gamePlay:string;
  type:string;
  player:number;
  time:Date;


}
module.exports = (sequelize: any, DataTypes: any) => {
  class ticketHis extends Model<UserAttributes>
    implements UserAttributes {
      userId!: number;
      gamePlay!:string;
      type!:string;
      player!:number;
      time!:Date;


    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ticketHis.init({
    userId: { type: DataTypes.INTEGER },
    gamePlay:{type:DataTypes.STRING},
    type:{type:DataTypes.STRING},
    player:{type:DataTypes.INTEGER},
    time:{type:DataTypes.DATE}




  }, {
    sequelize,
    modelName: 'TicketHis',
  });
  return ticketHis;
};

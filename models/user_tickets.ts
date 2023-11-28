'use strict';
import {
  Model
} from 'sequelize';
interface UserAttributes {
  userId: number;
  tickets: number


}
module.exports = (sequelize: any, DataTypes: any) => {
  class ticket extends Model<UserAttributes>
    implements UserAttributes {
    userId!: number;
    tickets!: number


    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ticket.init({
    userId: { type: DataTypes.INTEGER },
    tickets: { type: DataTypes.INTEGER },




  }, {
    sequelize,
    modelName: 'Tickets',
  });
  return ticket;
};

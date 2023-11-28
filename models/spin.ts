'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
userId:number;
lastspin:Date;
spincount:number;
active:boolean;


}
module.exports = (sequelize:any, DataTypes:any) => {
  class  spin extends Model<UserAttributes>
  implements UserAttributes {
    userId!:number;
    lastspin!:Date;
    spincount!:number;
    active!:boolean;

    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  spin.init({
    userId:{type:DataTypes.INTEGER},
    lastspin:{type:DataTypes.DATE},
    spincount:{type:DataTypes.INTEGER},
    active:{type:DataTypes.BOOLEAN}

   
 
  }, {
    sequelize,
    modelName: 'Spins', 
  });
  return  spin;
};

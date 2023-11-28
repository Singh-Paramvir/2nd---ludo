'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
rupees:number;
players:number;
time:string;
active:boolean;
type:number;
first:number;
second:number;
third:number;
fourth:number;

}
module.exports = (sequelize:any, DataTypes:any) => {
  class  gameSlotes extends Model<UserAttributes>
  implements UserAttributes {
    rupees!:number;
    players!:number;
    time!:string;
    active!:boolean;
    type!: number;
    first!:number;
second!:number;
third!:number;
fourth!:number;

    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  gameSlotes.init({
    rupees:{type:DataTypes.INTEGER},
    players:{type:DataTypes.INTEGER},
    time:{type:DataTypes.INTEGER},
    active:{type:DataTypes.BOOLEAN},
    type:{type:DataTypes.INTEGER},
    first:{type:DataTypes.INTEGER},
    second:{type:DataTypes.INTEGER},
    third:{type:DataTypes.INTEGER},
    fourth:{type:DataTypes.INTEGER}

   
 
  }, {
    sequelize,
    modelName: 'GameSlotes', 
  });
  return  gameSlotes;
};

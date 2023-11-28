'use strict';
import {
  Model
} from 'sequelize';
interface UserAttributes {
  userId: number;
  query:string;
  answer:string;
  resolve:boolean;
  
}
module.exports = (sequelize: any, DataTypes: any) => {
  class UserQuery extends Model<UserAttributes>
    implements UserAttributes {
   userId!: number;
  query!:string;
  answer!:string;
  resolve!:boolean;


    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserQuery.init({
    userId:{ type: DataTypes.INTEGER },
    query:{type:DataTypes.STRING},
    answer:{type:DataTypes.STRING},
    resolve:{type:DataTypes.BOOLEAN},
  




  }, {
    sequelize,
    modelName: 'UserQuerys',
  });
  return UserQuery;
};

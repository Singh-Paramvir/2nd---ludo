'use strict';
import {
  Model
} from 'sequelize';
interface UserAttributes {
 instagram:string
 rateUs:string;
 termscondition:string;
 privancyPolicy:string;
 maximum:number;
 minimum:number;
 String:string
 withdrawFee:number;
type:number;


}
module.exports = (sequelize: any, DataTypes: any) => {
  class socialLink extends Model<UserAttributes>
    implements UserAttributes {
      instagram!:string
      rateUs!:string;
      termscondition!:string;
      privancyPolicy!:string;
      maximum!:number;
      minimum!:number;
      String!:string
      withdrawFee!:number
      type!: number;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  socialLink.init({
   instagram:{type:DataTypes.STRING},
   rateUs:{type:DataTypes.STRING},
   termscondition:{type:DataTypes.STRING},
   privancyPolicy:{type:DataTypes.STRING},
   maximum:{type:DataTypes.INTEGER},
   minimum:{type:DataTypes.INTEGER},
   String:{type:DataTypes.STRING},
   withdrawFee:{type:DataTypes.DOUBLE},
   type:{type:DataTypes.INTEGER}



  }, {
    sequelize,
    modelName: 'SocialLinks',
  });
  return socialLink;
};

const {
  Request,
  Response
} = require('express');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
import {
  log
} from "console";
import db from "../../models"
import moment from 'moment';
const MyQuery = db.sequelize;
const {
  QueryTypes
} = require('sequelize');

class cronController {
  async test() {
    console.log("payload")

    var sql = `UPDATE Users
        SET gs1 = null, gs2 = null, gs3 = null,EAWatch = null,EATime = null,gamezopAdd = null `;
    console.log(sql, "sql");
    var data = await MyQuery.query(sql, {
      type: QueryTypes.UPDATE
    });


    console.log("yes done");


  }
  async matrix() {
    try {
     console.log("hit now");
      var sql1 = `SELECT COUNT(*) as EAWatch FROM DailyRewards WHERE DATE(createdAt) = CURDATE()`;
      var reward = await MyQuery.query(sql1, {
        type: QueryTypes.SELECT
      });


      var sql2 = `SELECT COUNT(*) AS total FROM Users WHERE DATE(createdAt) = CURDATE()`;
      var data2 = await MyQuery.query(sql2, {
        type: QueryTypes.SELECT
      });

      var sql3 = `SELECT COUNT(*) AS gs1 FROM Performances WHERE gsId = 11 AND DATE(createdAt) = CURDATE()`;
      var gs1 = await MyQuery.query(sql3, {
        type: QueryTypes.SELECT
      });

      var sql4 = `SELECT COUNT(*) AS gs2 FROM Performances WHERE gsId = 12 AND DATE(createdAt) = CURDATE()`;
      var gs2 = await MyQuery.query(sql4, {
        type: QueryTypes.SELECT
      });

      var sql5 = `SELECT COUNT(*) AS gs3 FROM Performances WHERE gsId = 13 AND DATE(createdAt) = CURDATE()`;
      var gs3 = await MyQuery.query(sql5, {
        type: QueryTypes.SELECT
      });

      var sql5 = `SELECT COUNT(*) AS todayRowCount FROM Users
      WHERE lastName IS NOT NULL AND DATE(createdAt) = CURRENT_DATE and DATE(lastName) = CURRENT_DATE`
      var cash = await MyQuery.query(sql5, {
        type: QueryTypes.SELECT
      });

      var gamezop = `SELECT COUNT(*) as total FROM Users  WHERE gamezopAdd <> 0;`;
      var gamezop = await MyQuery.query(gamezop, {
        type: QueryTypes.SELECT
      });

      console.log("hit now");
      console.log(gs1[0].gs1,gs2[0].gs2,gs3[0].gs3,"get all");
      let a =JSON.parse(gs1[0].gs1)  +JSON.parse(gs2[0].gs2 ) +JSON.parse(gs3[0].gs3) ;
      console.log(a,"total usera");
      // add data to matrix table

      let addData = await db.Matrics.create({
        todayUsers:data2[0].total,
        dailyRewardTotal:reward[0].EAWatch,
        totalMatchS1:gs1[0].gs1,
        totalMatchS2:gs2[0].gs2,
        totalMatchS3:gs3[0].gs3,
        totalMatch:a,
        gamezopeTotal:gamezop[0].total
      })
      console.log("data enter",addData);

    } catch (e) {
      console.log(e)
    }


  }
  async cron1() {
    try {
      console.log("yesyes")
      // const documents = await spin.find({ active: false });
      let documents = await db.Spins.findAll({
        where: {
          active: false
        }
      })
      console.log(documents, "docu");
      const currentDate = new Date();
      console.log(currentDate, "date");
      for (const document of documents) {
        const lastSpinDate = new Date(document.lastspin);
        const timeDifference = currentDate.getTime() - lastSpinDate.getTime();
        const hoursDifference = timeDifference / (1000 * 60 * 60); // Convert milliseconds to hours

        if (hoursDifference >= 24) {
          document.active = true;
          document.lastspin = Date.now()
          await document.save();
          console.log(`Updated active field for document with _id ${document._id}`);
        }
      }
    } catch (error) {
      console.error('Error updating active field:', error);
    }
  }
  // cronDate update
  async updateUserDeviceIds() {
    try {


      const twoDaysAgo = moment().subtract(2, 'days').toDate();


      const usersToUpdate = await db.Users.findAll({});

      console.log('Users found:', usersToUpdate);

      for (const user of usersToUpdate) {


        // Calculate the difference in milliseconds between now and cronDate
        const timeDifference = Date.now() - user.cronDate.getTime();

        // Calculate the difference in days
        const daysDifference = timeDifference / (1000 * 3600 * 24);

        if (daysDifference >= 2) {
          // Update the deviceId to null and await the update operation
          await user.update({
            deviceId: null
          });

        }
      }
    } catch (err) {
      console.error('Error updating users:', err);
    }
  }

  async updateInstagramPerformance() {
    try {
      // Generate a random number between 100 and 300
      const randomPerformance = Math.floor(Math.random() * (300 - 100 + 1)) + 100;

      let check = await db.SocialLinks.findOne({
        where: {
          id: 1
        }
      })
      await check.update({
        instagram: randomPerformance
      })
      // var sql = `UPDATE instagram SET Performance = '${randomPerformance}'`;
      //       var minMax = await MyQuery.query(sql, { type: QueryTypes.UPDATE });

      console.log(`Instagram Performance updated to ${randomPerformance}`);
    } catch (err) {
      console.error('Error updating Instagram Performance:', err);
    }
  }

}

export default new cronController();
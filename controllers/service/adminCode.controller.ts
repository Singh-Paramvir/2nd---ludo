import { hash, hashSync } from 'bcryptjs';
import { Request, Response } from 'express';

import bcryptjs = require("bcryptjs");
bcryptjs.genSalt(10, function (err, salt) {
    bcryptjs.hash("B4c0/\/", salt, function (err, hash) {
        // Store hash in your password DB.
    });
});

import db from "../../models"
const jwt = require('jsonwebtoken')
import commonController from '../common/common.controller';
const MyQuery = db.sequelize;
const { QueryTypes } = require('sequelize');

class AdminCodeController {
    async adminDetail(payload: any, res: Response) {
        const { id, data } = payload;
        try {

            // if 0 then send all 
            if (data == 0) {
                var aa = await db.GameSlotes.findAll({})
                if (aa) {
                    commonController.successMessage(aa, "success", res)
                }
                return;
            }


            var aa = await db.GameSlotes.findAll({
                where: {
                    type: data
                }
            })
            if (aa) {
                commonController.successMessage(aa, "success", res)
            }
        }
        catch (e) {
            console.log(e)
            commonController.errorMessage("Not Found", res)
        }
    }
    async updateSlotes(payload: any, res: Response) {
        const { rupees, players, time, id, first, second, third, fourth,totalPlay,timeToPlay } = payload;
        console.log(payload, "payload");

        try {
            var aa = await db.GameSlotes.findOne({
                where: {
                    id
                }
            })
            if (aa) {
                await aa.update({ rupees, players, time, first, second, third, fourth,totalPlay,timeToPlay })
                commonController.successMessage(aa, "Slotes Update Successfully", res)
            } else {
                commonController.errorMessage("Data Not Found", res)
            }
        }
        catch (e) {
            console.log(e)
            commonController.errorMessage("Not Found", res)
        }
    }
    async addslote(payload: any, res: Response) {
        const { addplayer1, addrupee1, addtime1, type, first, second, third, fourth } = payload;
        console.log(payload, "payload");

        try {
            let addSlote = await db.GameSlotes.create({
                rupees: JSON.parse(addrupee1), players: JSON.parse(addplayer1), time: JSON.parse(addtime1), active: 1, type,
                first, second, third, fourth
            })
            commonController.successMessage(addSlote, "New Slote Added", res)
        }
        catch (e) {
            console.log(e)
            commonController.errorMessage("Not Found", res)
        }
    }
    async getAllUser(payload, res) {
        try {
            const { buttonValue } = payload
            console.log(payload, "pay");

            if (buttonValue == 0) {
                const today = ` SELECT * from Users order by id desc `;
              console.log(today);
              
                   const addSlote = await MyQuery.query(today, { type: QueryTypes.SELECT });
                // let addSlote = await db.Users.findAll({});
                console.log(addSlote.length, "length here");

               
                console.log("yes");
                
                var sql = `SELECT COUNT(*) AS total FROM Users`;
                var data1 = await MyQuery.query(sql, { type: QueryTypes.SELECT });
                console.log("yes",data1);
                var sql = `SELECT COUNT(*) AS total FROM Users WHERE DATE(createdAt) = CURDATE()`;
                var data2 = await MyQuery.query(sql, { type: QueryTypes.SELECT });
                console.log(data2,"yes");
                commonController.successMessage({addSlote,data1,data2}, "New Slote Added", res);
                return;
            }

            const today = `SELECT * from Users where segmentType = ${buttonValue}  order by id desc `;
               const addSlote = await MyQuery.query(today, { type: QueryTypes.SELECT });
          
            var sql = `SELECT COUNT(*) AS total FROM Users where segmentType =${buttonValue}`;
            var data1 = await MyQuery.query(sql, { type: QueryTypes.SELECT });
            var sql = `SELECT COUNT(*) AS total
            FROM Performances p
            JOIN Users u ON p.userId = u.id
            WHERE DATE(p.createdAt) = CURDATE() AND u.segmentType =${buttonValue}`;
            var data2 = await MyQuery.query(sql, { type: QueryTypes.SELECT });

            commonController.successMessage({addSlote,data1,data2}, "New Slote Added", res);
        } catch (e) {
            console.log(e);
            commonController.errorMessage("Not Found", res);
        }
    }
    // get pending withdraw

    async gpw(payload: any, res: Response) {
        const { Id, buttonValue } = payload;
        try {

            if (buttonValue == 0) {
                const today = `SELECT a.firstName,a.mobileNumber,b.id,b.money,b.paymentMethod,b.totalAmount,b.transactionId from Users a,Withdraws b where a.id=b.userId and b.active = 0 order by id desc`;
                const totalUser = await MyQuery.query(today, { type: QueryTypes.SELECT });
                commonController.successMessage(totalUser, "Data Fetch Successfully", res)
            }

            const today = `SELECT a.firstName,a.mobileNumber,b.id,b.money,b.paymentMethod,b.totalAmount,b.transactionId 
      from Users a,Withdraws b where a.segmentType=${buttonValue} and a.id=b.userId and b.active = 0 order by id desc`;
            const totalUser = await MyQuery.query(today, { type: QueryTypes.SELECT });
            commonController.successMessage(totalUser, "Data Fetch Successfully", res)
        }
        catch (e) {
            console.log(e)
            commonController.errorMessage("Not Found", res)
        }
    }
    async deleteRequest(payload: any, res: Response) {
        try {
            const { Id, id } = payload;
            var sql = `DELETE FROM Withdraws WHERE id = ${id}`;
            var data = await MyQuery.query(sql, { type: QueryTypes.DELETE });
            commonController.successMessage({}, "request delete successfully", res)
        } catch (e) {
            commonController.errorMessage("Not Found", res)
        }
    }
    //get approve request
    async getapproveRequest(payload: any, res: Response) {
        try {
            const { Id, buttonValue } = payload;
            console.log("2232");

            if (buttonValue == 0) {
                var sql = `SELECT a.firstName,a.mobileNumber,b.id,b.money,b.paymentMethod,b.totalAmount,b.transactionId from Users a,Withdraws b where a.id=b.userId and b.active = 1`;
                var data = await MyQuery.query(sql, { type: QueryTypes.SELECT });
                console.log(data, "dfdfdf");

                commonController.successMessage(data, "Data getting successfully", res)
            }
            var sql = `SELECT a.firstName,a.mobileNumber,b.id,b.money,b.paymentMethod,b.totalAmount,b.transactionId 
           from Users a,Withdraws b where a.segmentType = ${buttonValue} and a.id=b.userId and b.active = 1`;
            var data = await MyQuery.query(sql, { type: QueryTypes.SELECT });
            console.log(data, "dfdfdf");

            commonController.successMessage(data, "Data getting successfully", res)

        } catch (e) {
            commonController.errorMessage("Not Found", res)
        }
    }
    async getSocial(payload: any, res: Response) {
        try {
            console.log("2232");

            const { Id, buttonValue } = payload;
            if (buttonValue == 0) {
                var sql = `select * from SocialLinks`;
                var data = await MyQuery.query(sql, { type: QueryTypes.SELECT });
                console.log(data, "dfdfdf");
                let x = data[0]
                console.log(x, "xxx");

                commonController.successMessage(x, "Data getting successfully", res)
            }
            var sql = `select * from SocialLinks where type =${buttonValue}`;
            var data = await MyQuery.query(sql, { type: QueryTypes.SELECT });
            console.log(data, "dfdfdf");
            let x = data[0]
            console.log(x, "xxx");

            commonController.successMessage(x, "Data getting successfully", res)

        } catch (e) {
            commonController.errorMessage("Not Found", res)
        }
    }
    async getseg(payload: any, res: Response) {
        try {
            const { Id, buttonValue } = payload;
            
                var sql = `select * from SegPercentages`;
                var data = await MyQuery.query(sql, { type: QueryTypes.SELECT });
               

                commonController.successMessage(data, "Data getting successfully", res)
           
         

        } catch (e) {
            commonController.errorMessage("Not Found", res)
        }
    }
    async getperfor(payload: any, res: Response) {
        try {
            const { Id, buttonValue } = payload;
            
                var sql = `SELECT u.id,u.mobileNumber, u.balance, u.segmentType, u.totalMatch,u.winMatch
                FROM Users u LEFT JOIN Performances p ON u.id = p.userId
           GROUP BY u.id, u.mobileNumber, u.balance, u.segmentType`;
                var data = await MyQuery.query(sql, { type: QueryTypes.SELECT });
               
                var sql = `SELECT COUNT(*) AS total FROM Performances ;`;
                var data1 = await MyQuery.query(sql, { type: QueryTypes.SELECT });
                var sql = `SELECT COUNT(*) AS total FROM Performances WHERE DATE(createdAt) = CURDATE();`;
                var data2 = await MyQuery.query(sql, { type: QueryTypes.SELECT });
                commonController.successMessage({data,data1,data2}, "Data getting successfully", res)
           
         

        } catch (e) {
            console.log(e,"error");
            
            commonController.errorMessage("Not Found", res)
        }
    }
    async getuserhis(payload: any, res: Response) {
        try {
            const { Id, buttonValue,id } = payload;
             console.log(payload,"pattt");
             
                var sql = `SELECT * from Performances where userId = ${id}`;
                var data = await MyQuery.query(sql, { type: QueryTypes.SELECT });
               
               

                commonController.successMessage(data, "Data getting successfully", res)
           
         

        } catch (e) {
            commonController.errorMessage("Not Found", res)
        }
    }
    async getadddata(payload: any, res: Response) {
        try {
            const { Id, buttonValue,id } = payload;
             console.log(payload,"pattt");
             
                var sql = `SELECT * from ExtraAdds `;
                var data = await MyQuery.query(sql, { type: QueryTypes.SELECT });
               
               

                commonController.successMessage(data, "Data getting successfully", res)
           
         

        } catch (e) {
            commonController.errorMessage("Not Found", res)
        }
    }
    async ued(payload: any, res: Response) {
        try {
            const { Id,time,amount,perDay} = payload;
             console.log(payload,"pattt");
             
             let editData = await db.ExtraAdds.findOne({
                where:{
                    id:1
                }
             })
             if(editData){
                await editData.update({ time,amount,perDay})
             }
                commonController.successMessage(editData, "Data getting successfully", res)
           } catch (e) {
            commonController.errorMessage("Not Found", res)
        }
    }
    async cpm(payload: any, res: Response) {
        try {
            const { Id,days } = payload;
            console.log(days,"saas");
            
            if(days.length == 0){
                var sql = `SELECT
                p.userId,
                COUNT(*) AS totalMatches,
                SUM(p.win) AS totalWins,
                SUM(p.lose) AS totalLosses,
                (SUM(p.win) / COUNT(*) * 100) AS winningRatio,
                u.mobileNumber
            FROM
                Performances p
            JOIN
                Users u ON p.userId = u.id
            WHERE
                p.createdAt >= DATE_SUB(NOW(), INTERVAL 1 DAY)
                AND p.userId IN (
                    SELECT userId
                    FROM Performances
                    WHERE createdAt >= DATE_SUB(NOW(), INTERVAL 1 DAY)
                    GROUP BY userId
                    HAVING COUNT(DISTINCT DATE(createdAt)) >= 1
                )
            GROUP BY
                p.userId;`;
                var data = await MyQuery.query(sql, { type: QueryTypes.SELECT });
               
                commonController.successMessage(data, "Data getting successfully", res)
                return
            }
             console.log(payload,"pattt");
             
                var sql = `SELECT
                p.userId,
                COUNT(*) AS totalMatches,
                SUM(p.win) AS totalWins,
                SUM(p.lose) AS totalLosses,
                (SUM(p.win) / COUNT(*) * 100) AS winningRatio,
                u.mobileNumber
            FROM
                Performances p
            JOIN
                Users u ON p.userId = u.id
            WHERE
                p.createdAt >= DATE_SUB(NOW(), INTERVAL ${days} DAY)
                AND p.userId IN (
                    SELECT userId
                    FROM Performances
                    WHERE createdAt >= DATE_SUB(NOW(), INTERVAL ${days} DAY)
                    GROUP BY userId
                    HAVING COUNT(DISTINCT DATE(createdAt)) >= ${days}
                )
            GROUP BY
                p.userId;`;
                var data = await MyQuery.query(sql, { type: QueryTypes.SELECT });
               
                commonController.successMessage(data, "Data getting successfully", res)
           
        } catch (e) {
            commonController.errorMessage("Not Found", res)
        }
    }
    async updateSocial(payload: any, res: Response) {
        try {
            const { ID, instagram, rateUs, termscondition, privancyPolicy, maximum, minimum, withdrawFee, String } = payload;

            if (ID == 0) {
                commonController.errorMessage("Please Select a Id", res)
                return;
            }
            let check = await db.SocialLinks.findOne({
                where: {
                    id: ID
                }
            })
            if (check) {
                await check.update({ instagram, rateUs, termscondition, privancyPolicy, maximum, minimum, withdrawFee, String })
                commonController.successMessage(check, "data updated successfully", res)
            }

        } catch (e) {
            commonController.errorMessage("Not Found", res)
        }
    }
    async updateseg(payload: any, res: Response) {
        try {
            const {id,percentage} = payload;

            let check = await db.SegPercentage.findOne({
                where: {
                    id
                }
            })
            if (check) {
                await check.update({ percentage})
                commonController.successMessage(check, "data updated successfully", res)
            }

        } catch (e) {
            console.log(e);
            
            commonController.errorMessage("Not Found", res)
        }
    }
    //update social
    // appprove request
    async approveRequest(payload: any, res: Response) {
        try {
            const { id } = payload;
            let getreq = await db.Withdraws.findOne({
                where: {
                    id
                }
            })
            if (getreq) {
                await getreq.update({ active: 1 })
                commonController.successMessage(getreq, "Request Approved", res)

            }
        } catch (e) {
            commonController.errorMessage("Not Found", res)
        }
    }
    //user sort
    async userCount(payload: any, res: Response) {
        const { Id, date, SegId } = payload;
        console.log(payload, "payload");

        try {
            if (SegId == 0) {
                // Fetch total user count
                const totalUserCountQuery = `SELECT COUNT(*) as count FROM Users`;
                const [totalUserCountData] = await MyQuery.query(totalUserCountQuery, { type: QueryTypes.SELECT });
                const totalUserCount = totalUserCountData.count; // Change this line
                console.log(totalUserCount, "lklklkkl");


                // Fetch today's user count based on the specified date
                const today = `SELECT createdAt from Users`;
                const totalUser = await MyQuery.query(today, { type: QueryTypes.SELECT });

                let todayUserCount = 0;

                for (let i = 0; i < totalUser.length; i++) {

                    const datePortion = new Date(totalUser[i].createdAt).toISOString().split('T')[0];

                    if (datePortion == date) {
                        todayUserCount++
                    }


                }
                console.log(todayUserCount, "todat");

                const response = {
                    totalUserCount,
                    todayUserCount
                };
                commonController.successMessage(response, "success", res)
                return;
            }
            // Fetch total user count
            const totalUserCountQuery = `SELECT COUNT(*) as count FROM Users where segmentType = ${SegId}`;
            const [totalUserCountData] = await MyQuery.query(totalUserCountQuery, { type: QueryTypes.SELECT });
            const totalUserCount = totalUserCountData.count; // Change this line
            console.log(totalUserCount, "lklklkkl");


            // Fetch today's user count based on the specified date
            const today = `SELECT createdAt from Users where segmentType = ${SegId}`;
            const totalUser = await MyQuery.query(today, { type: QueryTypes.SELECT });

            let todayUserCount = 0;

            for (let i = 0; i < totalUser.length; i++) {

                const datePortion = new Date(totalUser[i].createdAt).toISOString().split('T')[0];

                if (datePortion == date) {
                    todayUserCount++
                }


            }
            console.log(todayUserCount, "todat");

            const response = {
                totalUserCount,
                todayUserCount
            };
            commonController.successMessage(response, "success", res)

        } catch (e) {
            console.log(e);
            commonController.errorMessage("Not Found", res)
        }
    }

    async matchCount(payload: any, res: Response) {
        const { Id, date, SegId } = payload;
        console.log(payload, "payload");

        try {
         
                // Fetch total user count
                const totalUserCountQuery = `SELECT COUNT(*) as count FROM Performances`;
                const [totalUserCountData] = await MyQuery.query(totalUserCountQuery, { type: QueryTypes.SELECT });
                const totalUserCount = totalUserCountData.count; // Change this line
                console.log(totalUserCount, "lklklkkl");


                // Fetch today's user count based on the specified date
                const today = `SELECT createdAt from Performances`;
                const totalUser = await MyQuery.query(today, { type: QueryTypes.SELECT });

                let todayUserCount = 0;
                console.log("date----",date);
                
                for (let i = 0; i < totalUser.length; i++) {

                    const datePortion = new Date(totalUser[i].createdAt).toISOString().split('T')[0];

                    if (datePortion == date) {
                        todayUserCount++
                    }


                }
                console.log(todayUserCount, "todat");

                const response = {
                    totalUserCount,
                    todayUserCount
                };
                commonController.successMessage(response, "success", res)
                return;
            
           

        } catch (e) {
            console.log(e);
            commonController.errorMessage("Not Found", res)
        }
    }
    async deleteslote(payload: any, res: Response) {
        const { id } = payload;
        console.log(payload, "payload");
        try {
            var data = await db.GameSlotes.findOne({
                where: {
                    id
                }
            })
            if (data) {

                var result = data.destroy({
                    where: {
                        id: id
                    }
                }).then(function (rowDeleted) { // rowDeleted will return number of rows deleted
                    if (rowDeleted === 1) {
                        console.log('Deleted successfully');
                    }
                }, function (err) {
                    console.log(err);
                });

                commonController.successMessage({}, "data delete  sucessfully", res)
                console.log("data delete  sucessfully");
            }
        } catch (e) {
            console.log(e)
            commonController.errorMessage("Not Found", res)
        }


    }
    async deleteuser(payload: any, res: Response) {
        const { id } = payload;
        console.log(payload, "payload");
        try {
            console.log("inside the data", id);

            var sql = `DELETE FROM Users WHERE id =${id}`;
            var result = await MyQuery.query(sql, { type: QueryTypes.DELETE });

            commonController.successMessage({}, "data delete  sucessfully", res)
            console.log("data delete  sucessfully");
        } catch (e) {
            console.log(e)
            commonController.errorMessage("Not Found", res)
        }


    }
}

export default new AdminCodeController();
// export default new hello();

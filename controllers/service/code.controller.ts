import { Request, Response } from 'express';
import db from "../../models"
const MyQuery = db.sequelize;
const { QueryTypes } = require('sequelize');
const jwt = require('jsonwebtoken')
import commonController from '../common/common.controller';
import https from 'https'
import { Encrypt } from '../common/encryptpassword';
const { format } = require('date-fns');

// socket code
// import { io } from '../..';
import { log } from 'util';
var qs = require('querystring');
import moment from 'moment';
const OneSignal = require('onesignal-node');



class CodeController {
    //send otp
    async sendotp(payload, res) {
        try {
            var options = {
                'method': 'POST',
                'hostname': '2factor.in',
                'path': '/API/R1/',
                'headers': {},
                'maxRedirects': 20
            };

            var req = https.request(options, function (apiRes) {
                var chunks: any = [];

                apiRes.on("data", function (chunk) {
                    chunks.push(chunk);
                });

                apiRes.on("end", function (chunk) {
                    var body = Buffer.concat(chunks);
                    console.log(body.toString());
                });

                apiRes.on("error", function (error) {
                    console.error(error);
                });
            });

            var postData = qs.stringify({
                'module': 'TRANS_SMS',
                'apikey': '8cc13f17-26c6-11ee-addf-0200cd936042',
                'to': '919729214433',
                'from': 'ludost',
                'msg': 'DLT Approved Message Text Goes Here',
                'templatename': 'otptest'
            });

            req.write(postData);
            console.log("Request sent successfully", postData);

            req.end();
        } catch (e) {
            console.log(e, "error");
            commonController.errorMessage(e, res);
        }
    }

    async checkEmail(payload: any, res: Response) {
        try {
            const { email } = payload;
            console.log("2", email);

            var result = await db.Users.findOne({
                where: {
                    mobileNumber: email
                },
            });
            console.log(result, "result");

            return result;
        } catch (e) {
            console.log(e);
            //  commonController.errorMessage(e,res);
        }
    }
    async addad(payload: any, res: Response) {
        try {
            const { show, click, id } = payload;
            console.log(id, show);

            let addId = await db.Tickets.findOne({
                where: {
                    id: 1
                }
            })
            if (addId) {
                let add = addId.userId + JSON.parse(click);
                let addShow = addId.tickets + JSON.parse(show);
                await addId.update({ userId: add, tickets: addShow })
                commonController.successMessage(addId, "Data added", res)
            } else {
                commonController.successMessage({}, "something went wrong", res)
            }
        } catch (e) {
            console.log(e);

        }
    }
    async geteadata(payload: any, res: Response) {
        try {
            const { id } = payload;
            let getGs = await db.Users.findOne({
                where: {
                    id
                }
            })

            // extra add code here
            let checkAdd = await db.ExtraAdds.findOne({
                where: {
                    id: 1
                }
            })
            console.log(checkAdd.id, "ExtraAdds id");

            let arra: any = []
            console.log(getGs.EATime, "eatime");
            const date = new Date(getGs.EATime);

            const createdAt = moment(getGs.EATime).valueOf();
            const currentTime = moment().valueOf();
            const remainingTimeInMinutes = Math.floor((Math.max(createdAt, currentTime) - Math.min(createdAt, currentTime)) / 1000);
            console.log(checkAdd.time * 60, "reererere   second due", remainingTimeInMinutes);
            console.log("2nd data", getGs.EAWatch, checkAdd.perDay);

            if (getGs.EAWatch >= checkAdd.perDay) {
                console.log("1111");

                const extraAddData = {
                    "time": checkAdd.time,
                    "amount": checkAdd.amount,
                    "perDay": checkAdd.perDay,
                    "status": "0",
                    "countDownTime": checkAdd.countDownTime
                }
                arra.push(extraAddData)
            } else if (checkAdd.time * 60 > remainingTimeInMinutes) {
                console.log(checkAdd.time * 60, "pending time");

                if (remainingTimeInMinutes == 0) {
                    const extraAddData = {
                        "time": checkAdd.time,
                        "amount": checkAdd.amount,
                        "perDay": checkAdd.perDay,
                        "status": "1",
                        "countDownTime": checkAdd.countDownTime
                    }
                    arra.push(extraAddData)
                } else {
                    const extraAddData = {
                        "time": checkAdd.time,
                        "amount": checkAdd.amount,
                        "perDay": checkAdd.perDay,
                        "status": "2",
                        "remainTime": checkAdd.time * 60 - remainingTimeInMinutes,
                        "countDownTime": checkAdd.countDownTime
                    }
                    arra.push(extraAddData)
                }

            } else {
                const extraAddData = {
                    "time": checkAdd.time,
                    "amount": checkAdd.amount,
                    "perDay": checkAdd.perDay,
                    "status": "1",
                    "countDownTime": checkAdd.countDownTime
                }
                arra.push(extraAddData)
            }
            console.log(arra, "final data");

            commonController.successMessage({ ...arra[0] }, "Data get successfully", res)

        } catch (e) {
            console.log(e);

        }
    }
    async extraAdd(payload: any, res: Response) {
        try {
            const { id } = payload;
            console.log(id);

            let addId = await db.Users.findOne({
                where: {
                    id
                }
            })
            let getAmount = await db.ExtraAdds.findOne({
                where: {
                    id: 1
                }
            })
            console.log(getAmount.amount);

            if (addId) {
                if (addId.EAWatch == null) {
                    console.log(addId.balance, "====", getAmount.amount);

                    let sun = addId.balance + getAmount.amount
                    await addId.update({ EAWatch: 1, EATime: Date.now(), balance: sun })

                    // add to dailyreward table

                    let addrew = await db.DailyRewards.create({
                        userId: addId.id, rewardAmount: getAmount.amount
                    })
                    commonController.successMessage(addId, "Data added", res)
                    return;
                }
                console.log(addId.EAWatch, "????");
                let sun = addId.balance + getAmount.amount
                await addId.update({ EAWatch: addId.EAWatch + 1, EATime: Date.now(), balance: sun })
                let addrew = await db.DailyRewards.create({
                    userId: addId.id, rewardAmount: getAmount.amount
                })

                  // add user to matrix
                  console.log("matric work");
                  
                  var sql1 = `select createdAt from Matrics  order by id desc limit 1`;
                  var data1 = await MyQuery.query(sql1, { type: QueryTypes.SELECT });

                  let dateObject = new Date(data1[0].createdAt);
                  let dateString = dateObject.toISOString();
                  let day = dateString.slice(8, 10);
                  day = day.replace(/^0/, '');
                  const d = new Date();
                  let currentDate = d.getDate();
                  if (currentDate == JSON.parse(day)) {
                      var sql1 = `UPDATE Matrics SET dailyRewardTotal = dailyRewardTotal + 1`;
                      var data1 = await MyQuery.query(sql1, { type: QueryTypes.UPDATE });
                  } else {
                  let addData = await db.Matrics.create({
                      todayUsers:0,
                      cashAppTotal:0,
                      dailyRewardTotal:1,
                      totalMatchS1:0,
                      totalMatchS2:0,
                      totalMatchS3:0,
                      totalMatch:0,
                      gamezopeTotal:0
                    }) 
                  }
                  
                commonController.successMessage(addId, "Data added", res)
            } else {
                commonController.successMessage({}, "something went wrong", res)
            }
        } catch (e) {
            console.log(e);

        }
    }
    // api to add user
    async addUser(payload: any, res: Response) {
        const { firstName, lastName, mobileNumber, dob } = payload;

        let check = await db.Users.findOne({
            where: {
                mobileNumber
            }
        })
        if (check) {
            await check.update({ firstName, lastName, dob })
            const token = jwt.sign(
                {
                    mongoid: check.id,
                    userId: check.userId,
                    email: check.email
                },
                process.env.TOKEN_SECRET,
                { expiresIn: '30d' }
            );
            commonController.successMessage(token, "User Login successfully", res)
        } else {
        }
    }
    async test(payload: any, res: Response) {
        const { heading, message } = payload;
        console.log(payload, "payyy");

        try {
            console.log("yes");


            var sql1 = `SELECT COUNT(*) AS cashapp FROM Users WHERE DATE(lastName) = null`;
            var reward = await MyQuery.query(sql1, {
                type: QueryTypes.SELECT
            });



            console.log("done", reward);


        } catch (error) {
            console.error(error);
            commonController.errorMessage("Not Send", res);
        }

    }
    async updateActive(payload: any, res: Response) {
        try {
            const { id } = payload;
            let check = await db.Users.findOne({
                where: {
                    id
                }
            })
            if (!check) {
                commonController.successMessage({}, "user not found", res)
            } else {
                await check.update({ active: 1, lastName: Date.now() })
                var sql1 = `select createdAt from Matrics  order by id desc limit 1`;
                var data1 = await MyQuery.query(sql1, { type: QueryTypes.SELECT });

                let dateObject = new Date(data1[0].createdAt);
                let dateString = dateObject.toISOString();
                let day = dateString.slice(8, 10);
                day = day.replace(/^0/, '');
                const d = new Date();
                let currentDate = d.getDate();
                if (currentDate == JSON.parse(day)) {
                    var sql1 = `UPDATE Matrics SET cashAppTotal = cashAppTotal + 1`;
                    var data1 = await MyQuery.query(sql1, { type: QueryTypes.UPDATE });
                } else {
                let addData = await db.Matrics.create({
                    todayUsers:0,
                    cashAppTotal:2,
                    dailyRewardTotal:0,
                    totalMatchS1:0,
                    totalMatchS2:0,
                    totalMatchS3:0,
                    totalMatch:0,
                    gamezopeTotal:0
                  }) 
                }
                commonController.successMessage(check, "data updated successfully", res)
            }

        } catch (e) {
            console.log(e);
        }
    }
    async firstreward(payload: any, res: Response) {
        try {
            const { id } = payload;
            let check = await db.Users.findOne({
                where: {
                    id
                }
            })
            if (!check) {
                commonController.successMessage({}, "user not found", res)
            } else {

                let getReward = await db.ExtraAdds.findOne({
                    where:{
                        id:1
                    }
                })
                console.log(getReward.gamezopArray,"first reward");
                
                let x = check.balance + JSON.parse(getReward.gamezopArray)
                await check.update({ firstReward: 1, balance: x })
                commonController.successMessage(check, "data updated successfully", res)
            }

        } catch (e) {
            console.log(e);
        }
    }
    async gamezop(payload: any, res: Response) {
        try {
            const { id } = payload;
            let check = await db.Users.findOne({
                where: {
                    id
                }
            });

            if (!check) {
                commonController.successMessage({}, "User not found", res);
            } else {
                let a = check.gamezopAdd + 1;

                let checkAdd2 = await db.ExtraAdds.findOne({
                    where: {
                        id: 2
                    }
                });

                let status: number;
                let countDownTime: number;
                let amount: number;

                let check1 = await db.Users.findOne({
                    where: {
                        id
                    }
                });
                console.log(check1.gamezopAdd, "user gz use");
                console.log(checkAdd2.perDay, "user gz??????");

                if (a >= checkAdd2.perDay) {
                    status = 0;
                    countDownTime = checkAdd2.countDownTime;
                    amount = checkAdd2.amount;
                } else {
                    status = 1;
                    countDownTime = checkAdd2.countDownTime;
                    amount = checkAdd2.amount;
                }
                let b = check.balance + checkAdd2.amount
                await check.update({
                    gamezopAdd: a,
                    balance: b

                });


                const responseData = {
                    ...check.dataValues,
                    status,
                    amount,
                    countDownTime
                };

                console.log("matric work");
                  
                var sql1 = `select createdAt from Matrics  order by id desc limit 1`;
                var data1 = await MyQuery.query(sql1, { type: QueryTypes.SELECT });

                let dateObject = new Date(data1[0].createdAt);
                let dateString = dateObject.toISOString();
                let day = dateString.slice(8, 10);
                day = day.replace(/^0/, '');
                const d = new Date();
                let currentDate = d.getDate();
                if (currentDate == JSON.parse(day)) {
                    var sql1 = `UPDATE Matrics SET gamezopeTotal = gamezopeTotal + 1`;
                    var data1 = await MyQuery.query(sql1, { type: QueryTypes.UPDATE });
                } else {
                let addData = await db.Matrics.create({
                    todayUsers:0,
                    cashAppTotal:0,
                    dailyRewardTotal:0,
                    totalMatchS1:0,
                    totalMatchS2:0,
                    totalMatchS3:0,
                    totalMatch:0,
                    gamezopeTotal:1
                  }) 
                }

                commonController.successMessage(responseData, "Data updated successfully", res);
            }

        } catch (e) {
            console.log(e);
            // Handle the error appropriately
            commonController.errorMessage("Error occurred", res);
        }
    }

    async addgamezop(payload: any, res: Response) {
        try {
            const { id } = payload;
            let getGs = await db.Users.findOne({
                where: {
                    id,
                },
            });
            let checkAdd2 = await db.ExtraAdds.findOne({
                where: {
                    id: 2,
                },
            });

            const gamezopData: Record<string, any> = {};

            let gamezopData1: Record<string, any>;

            if (getGs.gamezopAdd >= checkAdd2.perDay) {
                gamezopData1 = {
                    status: 0,
                    perDay: checkAdd2.perDay,
                    time: checkAdd2.time,
                    amount: checkAdd2.amount,
                    countDownTime: checkAdd2.countDownTime,
                };
            } else {
                gamezopData1 = {
                    status: 1,
                    perDay: checkAdd2.perDay,
                    time: checkAdd2.time,
                    amount: checkAdd2.amount,
                    countDownTime: checkAdd2.countDownTime,
                };
            }

            let sun = await db.ExtraAdds.findOne({
                where: {
                    id: 2,
                },
            });

            // Convert the string representation of links to a JSON array
            const linksArray = JSON.parse(sun.gamezopArray);

            commonController.successMessage(
                { gamezopData1, links: linksArray },
                "data get successfully",
                res
            );
        } catch (e) {
            console.log(e);
        }
    }




    // admin login

    async adminLogin(payload: any, res: Response) {
        try {
            const { email, password } = payload;
            console.log(process.env.email, process.env.password);

            if (email == process.env.email) {
                const storedPassword = process.env.password;

                if (storedPassword) {
                    if (await Encrypt.comparePassword(password.toString(), storedPassword)) {
                        const token = jwt.sign(
                            { email: email, admin: true }, process.env.TOKEN_SECRET,
                            { expiresIn: '30d' }
                        );
                        commonController.successMessage(token, "admin login successfully", res);
                    } else {
                        commonController.errorMessage("Please Check Password", res);
                    }
                } else {
                    commonController.errorMessage("Password not set in environment variables", res);
                }
            } else {
                commonController.errorMessage("Please Check Email", res);
            }
        } catch (e) {
            console.log(e);
        }
    }
    async getDeviceId(payload: any, res: Response) {
        try {
            const { deviceId } = payload;
            console.log(deviceId, "deviceId api hit noe");

            let check = await db.Users.findOne({
                where: {
                    deviceId
                }
            })
            if (check) {
                const token = jwt.sign(
                    {
                        id: check.id,
                        mobileNumber: check.mobileNumber
                    },
                    process.env.TOKEN_SECRET,
                    { expiresIn: '30d' }
                );
                commonController.successMessage(token, "user find successfully", res)
            } else {
                commonController.successMessage({}, "not found", res)
            }

        } catch (e) {
            console.log(e);

        }
    }
    async checkUser(payload: any, res: Response) {
        try {
            const { deviceId, id } = payload;

            let check = await db.Users.findOne({
                where: {
                    id
                }

            })

            if (!check) {
                let addId = await db.Users.create({
                    deviceId
                })
                commonController.successMessage(addId, "Id added", res)
            } else {
                await check.update({ deviceId, cronDate: Date.now() })
                const token = jwt.sign(
                    {
                        id: check.id,
                        mobileNumber: check.mobileNumber,

                    },
                    process.env.TOKEN_SECRET,
                    { expiresIn: '30d' }
                );
                commonController.successMessage(token, "token get", res)
            }

        } catch (e) {
            console.log(e);

        }
    }

    async updateProfile(payload: any, res: Response) {
        const { firstName, lastName, dob, id } = payload;

        let check = await db.Users.findOne({
            where: {
                id
            }
        })
        if (check) {
            await check.update({ firstName, lastName, dob })
            commonController.successMessage(check, "User Profile updated successfully", res)
        } else {
            commonController.successMessage({}, "User Not Found", res)
        }
    }
    async updateAvatar(payload: any, res: Response) {
        const { id, avatar } = payload;
        console.log(payload, "asasasasasas");

        let check = await db.Users.findOne({
            where: {
                id
            }
        })
        if (check) {
            await check.update({ avatar })
            commonController.successMessage(check, "avatar updated successfully", res)
        } else {
            commonController.successMessage({}, "User Not Found", res)
        }
    }
    async getProfile(payload: any, res: Response) {
        try {
            const { id } = payload;
            console.log(id, "get profile hit now");
    
            // Fetch user data
            var sql = `select a.firstName,a.lastName,a.dob,a.mobileNumber,a.avatar,a.balance,a.totalWinning as totalwinning,
                a.winMatch as winMatch,a.totalMatch as totalgame,a.firstReward,
                a.uId,a.active as verify from Users a
                where a.id = ${id}`;
    
            var data = await MyQuery.query(sql, { type: QueryTypes.SELECT });
            console.log(data, "re3s");
    
            // Fetch gamezopArray
            var sql1 = `select gamezopArray from ExtraAdds where id = 1`;
            var data1 = await MyQuery.query(sql1, { type: QueryTypes.SELECT });
            console.log(data1, "gzd");
    
            // Add gamezopArray to the user data
            if (data.length > 0 && data1.length > 0) {
                data[0].firstRewardAmount = parseInt(data1[0].gamezopArray);
            }
    
            commonController.successMessage(data, "user data get successfully", res);
        } catch (e) {
            commonController.errorMessage(e, res);
            console.log(e, "error here");
        }
    }
    
    async getUiInfo(payload: any, res: Response) {
        try {
            const { id, SegId } = payload;
            console.log(payload, "pay");
            let tp
            let tp1
            let getGs = await db.Users.findOne({
                where: {
                    id
                }
            })
            let sun = JSON.parse(getGs.gs1);
            let sun1 = JSON.parse(getGs.gs2)
            let sun2 = JSON.parse(getGs.gs3)
            let sun3 = JSON.parse(getGs.gs4)
            let sun4 = JSON.parse(getGs.gs5)

            // Retrieve data from the database
            const sqlSlots = `SELECT * FROM GameSlotes WHERE active = 1 and type = ${SegId}`;
            const data = await MyQuery.query(sqlSlots, { type: QueryTypes.SELECT });

            for (let i = 0; i < data.length; i++) {


                if (sun == null) {

                    tp = 0
                    tp1 = 0

                } else if (data[i].id == sun[0].id) {


                    tp = sun[0].tp
                    tp1 = sun[0].createdAt

                } else if (sun1 == null) {

                    tp = 0
                    tp1 = 0
                }
                else if (data[i].id == sun1[0].id) {


                    tp = sun1[0].tp
                    tp1 = sun1[0].createdAt
                } else if (sun2 == null) {

                    tp = 0
                    tp1 = 0
                } else if (data[i].id == sun2[0].id) {


                    tp = sun2[0].tp
                    tp1 = sun2[0].createdAt
                } else if (sun3 == null) {
                    tp = 0
                    tp1 = 0
                } else if (data[i].id == sun3[0].id) {
                    tp = sun3[0].tp
                    tp1 = sun3[0].createdAt
                } else if (sun4 == null) {
                    tp = 0
                    tp1 = 0
                } else if (data[i].id == sun4[0].id) {
                    tp = sun4[0].tp
                    tp1 = sun4[0].createdAt
                }


                if (tp1 > 0) {
                    const date = new Date(tp1);

                    const createdAt = moment(tp1).valueOf(); // Convert the database timestamp to milliseconds
                    const currentTime = moment().valueOf(); // Get the current time in milliseconds


                    // Ensure createdAt is greater than or equal to currentTime
                    const remainingTimeInMinutes = Math.floor((Math.max(createdAt, currentTime) - Math.min(createdAt, currentTime)) / 1000);



                    if (data[i].totalPlay <= tp) {


                        data[i].active1 = 0;
                    }


                    if (data[i].timeToPlay * 60 > remainingTimeInMinutes) {

                        data[i].active = 2;
                        data[i].createdAt = remainingTimeInMinutes;
                        data[i].reminTime = data[i].timeToPlay * 60 - remainingTimeInMinutes;
                    }
                    if (data[i].timeToPlay * 60 < remainingTimeInMinutes) {

                        data[i].active = 1;
                        data[i].createdAt = remainingTimeInMinutes;
                    }
                }
            }

            const sqlAdvertisement = `SELECT * FROM Advertisements`;
            const sqlSocialLink = `SELECT instagram, rateUs, termscondition, privancyPolicy FROM SocialLinks`;
            const sqlMinMax = `SELECT maximum, minimum, withdrawFee,String FROM SocialLinks`;

            // extra add code here
            let checkAdd = await db.ExtraAdds.findOne({
                where: {
                    id: 1
                }
            })
            console.log(checkAdd.id, "ExtraAdds id");

            let arra: any = []
            console.log(getGs.EATime, "eatime");
            const date = new Date(getGs.EATime);

            const createdAt = moment(getGs.EATime).valueOf();
            const currentTime = moment().valueOf();
            const remainingTimeInMinutes = Math.floor((Math.max(createdAt, currentTime) - Math.min(createdAt, currentTime)) / 1000);
            console.log(checkAdd.time * 60, "reererere   second due", remainingTimeInMinutes);
            console.log("2nd data", getGs.EAWatch, checkAdd.perDay);

            if (getGs.EAWatch >= checkAdd.perDay) {
                console.log("1111");

                const extraAddData = {
                    "time": checkAdd.time,
                    "amount": checkAdd.amount,
                    "perDay": checkAdd.perDay,
                    "status": "0",
                    "countDownTime": checkAdd.countDownTime
                }
                arra.push(extraAddData)
            } else if (checkAdd.time * 60 > remainingTimeInMinutes) {
                console.log(checkAdd.time * 60, "pending time");

                if (remainingTimeInMinutes == 0) {
                    const extraAddData = {
                        "time": checkAdd.time,
                        "amount": checkAdd.amount,
                        "perDay": checkAdd.perDay,
                        "status": "1",
                        "countDownTime": checkAdd.countDownTime
                    }
                    arra.push(extraAddData)
                } else {
                    const extraAddData = {
                        "time": checkAdd.time,
                        "amount": checkAdd.amount,
                        "perDay": checkAdd.perDay,
                        "status": "2",
                        "remainTime": checkAdd.time * 60 - remainingTimeInMinutes,
                        "countDownTime": checkAdd.countDownTime
                    }
                    arra.push(extraAddData)
                }

            } else {
                const extraAddData = {
                    "time": checkAdd.time,
                    "amount": checkAdd.amount,
                    "perDay": checkAdd.perDay,
                    "status": "1",
                    "countDownTime": checkAdd.countDownTime
                }
                arra.push(extraAddData)
            }





            const [slots, advertisement, socialLink, minMax] = await Promise.all([
                data,
                MyQuery.query(sqlAdvertisement, { type: QueryTypes.SELECT }),
                MyQuery.query(sqlSocialLink, { type: QueryTypes.SELECT }),
                MyQuery.query(sqlMinMax, { type: QueryTypes.SELECT }),
            ]);

            // console.log(slots);
            let t = Math.floor(Math.random() * (2000 - 200 + 1) + 200);

            // Calculate the range for distribution (50 to 60 percent of t)
            const distributionRange = Math.floor(Math.random() * (60 - 50 + 1) + 50) / 100;
            const distributionAmount = Math.floor(t * distributionRange);

            // Distribute the amount randomly among the objects
            data.forEach((obj) => {
                obj.random = 0;
                obj.random += Math.floor(Math.random() * distributionAmount); // Remove decimal values
            });

            const onlineUsers = {
                random: t + 300,
            };





            // Send the modified data in the response
            commonController.successMessage({ slots: slots, advertisement, socialLink, minMax, onlineUsers, ...arra }, "uiinfo get successfully", res);
        } catch (e) {
            console.log(e);

            commonController.errorMessage(e, res);
        }
    }


    async addRoom(payload: any, res: Response) {
        try {
            const { id, playerIds, player } = payload;

            let sun = JSON.stringify(playerIds)

            let str = Math.random().toString(36).substr(2, 9).toUpperCase();
            let roomId = `AC52_${str}`;

            let userWithUserId = await db.Rooms.findOne({ where: { roomId } });
            while (userWithUserId != null) {
                // If userWithUserId exists, generate a new user ID and perform the query again
                const str = Math.random().toString(36).substr(2, 9).toUpperCase();
                roomId = `ARL_${str}`;
                userWithUserId = await db.Users.findOne({ where: { roomId } });
            }
            let addRoomData = await db.Rooms.create({
                userId: id, roomId, player, playerIds: sun
            })

            commonController.successMessage(addRoomData, "room created Successfully", res)
        } catch (e) {
            commonController.errorMessage(e, res)
        }
    }
    async getRequest(payload: any, res: Response) {
        try {
            const { id } = payload;
            console.log(payload, "dsdsdd");

            let checkRequest = await db.FriendReqs.findAll({
                where: {
                    receiverId: id,
                    active: false
                }
            })
            let arra: any = []
            console.log(checkRequest.senderId, "ide");
            for (let i = 0; i < checkRequest.length; i++) {
                console.log(checkRequest[i], "aaaaa");
                var sql = `select a.firstName,a.lastName,a.avatar,a.uId from Users a where uId = '${checkRequest[i].senderId}'`;
                var data = await MyQuery.query(sql, { type: QueryTypes.SELECT });
                arra.push(data)
            }
            // io.emit('get-req', arra)
            commonController.successMessage(arra, "request get successfully", res)

        } catch (e) {
            commonController.errorMessage(e, res)
        }
    }
    async getFriends(payload: any, res: Response) {
        try {
            const { id } = payload;

            let getId = await db.Users.findOne({
                where: {
                    id
                }
            })
            console.log(getId.uId, "here");

            let checkRequest = await db.FriendReqs.findAll({
                where: {
                    receiverId: getId.uId,
                    active: true
                }
            })
            let chec = await db.FriendReqs.findAll({
                where: {
                    senderId: getId.uId,
                    active: true
                }
            })
            console.log(checkRequest.length, "=====>");

            let arra: any = []
            for (let i = 0; i < checkRequest.length; i++) {
                var sql = `select a.firstName,a.lastName,a.avatar,a.uId from Users a where uId = '${checkRequest[i].senderId}'`;
                var data = await MyQuery.query(sql, { type: QueryTypes.SELECT });
                arra.push(data)
            }
            console.log("yyuyuyuyu");

            for (let i = 0; i < chec.length; i++) {
                console.log(chec[i].receiverId, "receiver here");

                var sql = `select a.firstName,a.lastName,a.avatar,a.uId from Users a where uId = '${chec[i].receiverId}'`;
                var data = await MyQuery.query(sql, { type: QueryTypes.SELECT });
                arra.push(data)
            }
            // io.emit('getAll-friends', arra)
            commonController.successMessage(arra, "request get successfully", res)

        } catch (e) {
            commonController.errorMessage(e, res)
        }
    }
    async acceptRequest(payload: any, res: Response) {
        try {
            const { id, reqId } = payload;

            let getId = await db.Users.findOne({
                where: {
                    id
                }
            })
            console.log(getId.uId);
            let checkReq = await db.FriendReqs.findOne({
                where: {
                    id, receiverId: getId.uId
                }
            })
            if (checkReq) {
                await checkReq.update({ active: true })
                commonController.successMessage(checkReq, "request accept successfully", res)
            } else {
                commonController.successMessage({}, "can't find request", res)
            }
        } catch (e) {
            commonController.errorMessage(e, res)
        }
    }
    async declineRequesr(payload: any, res: Response) {
        try {
            const { id, reqId } = payload;

            let getId = await db.Users.findOne({
                where: {
                    id
                }
            })
            console.log(getId.uId);
            let checkReq = await db.FriendReqs.findOne({
                where: {
                    id, receiverId: getId.uId
                }
            })
            if (checkReq) {
                var sql = `DELETE FROM FriendReqs WHERE id = ${reqId}`;
                var data = await MyQuery.query(sql, { type: QueryTypes.DELETE });
                commonController.successMessage({}, "request delete successfully", res)
            } else {
                commonController.successMessage({}, "can't find request", res)
            }
        } catch (e) {
            commonController.errorMessage(e, res)
        }
    }
    async addTicket(payload: any, res: Response) {
        try {
            const { id, gamePlay, type, player } = payload;

            console.log(id, "aaaaaaa");

            let addTicketHis = await db.TicketHis.create({
                userId: id, gamePlay, type, player, time: Date.now()
            })
            commonController.successMessage(addTicketHis, "ticket history added", res)

        } catch (e) {
            commonController.errorMessage(e, res)
        }
    }
    // add query

    async addQuery(payload: any, res: Response) {
        try {
            const { id, query } = payload;

            console.log(id, "aaaaaaa");

            let addQuery = await db.UserQuerys.create({
                userId: id, query, resolve: false
            })
            commonController.successMessage(addQuery, "query added successfully", res)

        } catch (e) {
            commonController.errorMessage(e, res)
        }
    }
    // get query
    async getQuery(payload: any, res: Response) {
        try {
            const { id } = payload;
            var sql = `SELECT * FROM UserQuerys WHERE userId = ${id}`;
            var data = await MyQuery.query(sql, { type: QueryTypes.SELECT });
            commonController.successMessage(data, "Data Get Successfully", res)

        } catch (e) {
            commonController.errorMessage(e, res)
        }
    }
    async getTicHis(payload: any, res: Response) {
        try {
            const { id } = payload;
            var sql = `SELECT * FROM TicketHis WHERE userId = ${id}`;
            var data = await MyQuery.query(sql, { type: QueryTypes.SELECT });
            commonController.successMessage(data, "ticket history", res)

        } catch (e) {
            commonController.errorMessage(e, res)
        }
    }
    // get history of withdraw
    async getHistory(payload: any, res: Response) {
        try {
            const { id, status } = payload;

            if (status == 3) {
                var sql = `SELECT * FROM Withdraws WHERE userId = ${id} order by id desc`;
                var data = await MyQuery.query(sql, { type: QueryTypes.SELECT });
                commonController.successMessage(data, "get withdraw history", res)
                return;
            } else {
                var sql = `SELECT * FROM Withdraws WHERE userId = ${id} and active = ${status} order by id desc`;
                var data = await MyQuery.query(sql, { type: QueryTypes.SELECT });
                commonController.successMessage(data, "get withdraw history", res)
            }
        } catch (e) {
            commonController.errorMessage(e, res)
        }
    }
    // widthdraw
    async withDraw(payload: any, res: Response) {
        try {
            const { id, amount, paymentMethod } = payload;
            console.log(payload);
            // getting fees 
            let getFee = await db.SocialLinks.findOne({
                where: {
                    id: 1
                }
            })
            if (amount > getFee.maximum) {
                commonController.successMessage({}, "maximum value is 4", res)
                return;
            }

            console.log(getFee.withdrawFee, "fess here =====");

            let checkUser = await db.Users.findOne({
                where: {
                    id
                }
            })
            console.log(checkUser.balance);

            // random generate transactionId
            const randomTransactionId = Math.random().toString(36).substring(2, 15);

            if (checkUser.balance >= amount) {


                let checkWidthdraw = await db.Withdraws.findOne({
                    where: {
                        userId: id,

                    }, order: [
                        ['id', 'DESC']
                    ]
                })
                if (checkWidthdraw) {
                    if (checkWidthdraw.active != 1) {
                        console.log("2");
                        commonController.successMessage({}, "Your Old Request Is Pending", res)
                    } else {
                        console.log("3");
                        let x = amount;

                        // minus balance
                        let xn = JSON.parse(amount)
                        let minusBalance = checkUser.balance - xn
                        await checkUser.update({ balance: minusBalance })

                        let addEntry = await db.Withdraws.create({
                            userId: id, money: xn, pamentMethod: 1, totalAmount: amount, paymentMethod, active: 0, transactionId: randomTransactionId // 0 mean pending 1 mean done
                        })
                        commonController.successMessage(addEntry, "Data Added Successfully", res)
                    }

                } else {
                    console.log("1 ure a gya");


                    // minus balance
                    let xn = JSON.parse(amount)
                    let minusBalance = checkUser.balance - xn
                    await checkUser.update({ balance: minusBalance })

                    let addEntry = await db.Withdraws.create({
                        userId: id, money: amount, pamentMethod: 1, totalAmount: amount, paymentMethod, active: 0, transactionId: randomTransactionId // 0 mean pending 1 mean done
                    })
                    commonController.successMessage(addEntry, "Data Added Successfully", res)
                }

            } else {
                commonController.successMessage({}, "please check balance", res)
            }


        } catch (e) {
            console.log(e, "error");

            commonController.errorMessage(e, res)
        }
    }
    async addFriend(payload: any, res: Response) {
        try {
            const { id, playerId } = payload;

            let sun = await db.Users.findOne({
                where: {
                    id
                }
            })
            console.log(sun.id, "sender", playerId);
            let moon = await db.Users.findOne({
                where: {
                    uId: playerId
                }
            })
            // console.log(moon.id,"receiver");
            if (!moon) {
                commonController.successMessage({}, "user not found", res)
            }

            let checkifFrirend = await db.FriendReqs.findOne({
                where: {
                    senderId: sun.uId,
                    receiverId: moon.uId
                }
            })
            if (checkifFrirend) {
                commonController.successMessage(checkifFrirend, "already request send", res)
            } else {
                let check = await db.FriendReqs.findOne({
                    where: {
                        receiverId: sun.uId, senderId: moon.uId
                    }
                })
                if (check) {
                    commonController.successMessage(check, "already request send", res)
                } else {
                    let addreq = await db.FriendReqs.create({
                        senderId: sun.uId, receiverId: moon.uId, active: false, date: Date.now()
                    })
                    commonController.successMessage(addreq, "friend request send successfully", res)
                }
            }
        } catch (e) {
            commonController.errorMessage(e, res)
        }
    }
    async addKyc(payload: any, res: Response) {
        try {
            const { id, cardName, cardNo } = payload;
            console.log(payload, "payload here");


            let checkUser = await db.Users.findOne({
                where: {
                    id
                }

            })
            let ifExist = await db.Kycs.findOne({
                where: {
                    userId: checkUser.id
                }

            })
            if (ifExist) {
                commonController.successMessage({}, "document already uploaded", res)
            } else {
                let adddoc = await db.Kycs.create({
                    userId: checkUser.id, cardName, cardNo, isApprove: false
                })
                commonController.successMessage(adddoc, "document uploaded successfully", res)
            }

        } catch (e) {
            commonController.errorMessage(e, res)
        }


    }
    async addPerFor(payload: any, res: Response) {
        try {
            const { id, win, lose, draw, leave, amount, position, players, gsId, count } = payload;
            console.log(payload, "pay here");

            // // set time
            const currentDateAndTime = new Date();

            // Custom date and time formatting function
            const formatDateTime = (date) => {
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const month = months[date.getMonth()];
                const day = date.getDate();
                const year = date.getFullYear();
                const hour = date.getHours() % 12 || 12;
                const minute = date.getMinutes();
                const period = date.getHours() >= 12 ? 'PM' : 'AM';
                return `${month} ${day}, ${year}, ${hour}:${minute} ${period}`;
            };

            const formattedDateTime = formatDateTime(currentDateAndTime);

            console.log(formattedDateTime, "final");


            let checkUser = await db.Users.findOne({
                where: {
                    id
                }

            })
            if (checkUser) {

                let addtototal = checkUser.totalMatch + 1

                await checkUser.update({ totalMatch: addtototal, dob: Date.now() })
                let addotp = await db.Performances.create({
                    userId: checkUser.id,
                    win, lose, draw, leave, amount, position, players, time: formattedDateTime, gsId, count
                })
                if (win == 1) {
                    console.log("yes win working");
                    let sun = JSON.parse(amount)
                    let total = checkUser.balance + sun
                    let addWin = checkUser.winMatch + 1
                    let winningT = checkUser.totalWinning + sun
                    await checkUser.update({ balance: total, winMatch: addWin, totalWinning: winningT })
                }

                // add extra work
                console.log(checkUser.segmentType, "ah ");

                let check = await db.GameSlotes.findAll({
                    where: {
                        type: checkUser.segmentType
                    }
                })
                console.log(check[0].id, "first");
                if (check[0].id == gsId) {
                    console.log(checkUser.gs1, "????");
                    if (leave == 1) {
                        console.log("yes leave == 1 working");


                    } else if (checkUser.gs1 == null) {
                        console.log("yes");
                        const addSun = {
                            id: gsId,
                            tp: 1,
                            createdAt: Date.now()
                        }
                        console.log("add");

                        await checkUser.update({ gs1: JSON.stringify([addSun]) })

                    } else {

                        const existingArray = JSON.parse(checkUser.gs1);

                        console.log(existingArray, "no");


                        existingArray[0].tp += 1;
                        existingArray[0].createdAt = Date.now();


                        await checkUser.update({
                            gs1: JSON.stringify(existingArray)
                        });
                        console.log("work");

                    }

                } else if (check[1].id == gsId) {
                    if (leave == 1) {
                        console.log("yes leave == 1 working");


                    } else if (checkUser.gs2 == null) {
                        const addSun = {
                            id: gsId,
                            tp: 1,
                            createdAt: Date.now()
                        }
                        await checkUser.update({ gs2: JSON.stringify([addSun]) })
                    } else {
                        const existingArray = JSON.parse(checkUser.gs2);
                        console.log(existingArray, "no");
                        existingArray[0].tp += 1;
                        existingArray[0].createdAt = Date.now();
                        await checkUser.update({
                            gs2: JSON.stringify(existingArray)
                        });
                        console.log("work");
                    }
                } else if (check[2].id == gsId) {
                    if (leave == 1) {
                        console.log("yes leave == 1 working");


                    } else if (checkUser.gs3 == null) {
                        const addSun = {
                            id: gsId,
                            tp: 1,
                            createdAt: Date.now()
                        }
                        await checkUser.update({ gs3: JSON.stringify([addSun]) })

                    } else {
                        const existingArray = JSON.parse(checkUser.gs3);
                        console.log(existingArray, "no");
                        existingArray[0].tp += 1;
                        existingArray[0].createdAt = Date.now();
                        await checkUser.update({
                            gs3: JSON.stringify(existingArray)
                        });
                        console.log("work");
                    }
                } else if (check[3].id == gsId) {
                    if (leave == 1) {
                        console.log("yes leave == 1 working");


                    } else if (checkUser.gs4 == null) {
                        const addSun = {
                            id: gsId,
                            tp: 1,
                            createdAt: Date.now()
                        }
                        await checkUser.update({ gs4: JSON.stringify([addSun]) })

                    } else {
                        const existingArray = JSON.parse(checkUser.gs4);
                        console.log(existingArray, "no");
                        existingArray[0].tp += 1;
                        existingArray[0].createdAt = Date.now();
                        await checkUser.update({
                            gs4: JSON.stringify(existingArray)
                        });
                        console.log("work");
                    }
                } else if (check[4].id == gsId) {
                    if (leave == 1) {
                        console.log("yes leave == 1 working");


                    } else if (checkUser.gs5 == null) {
                        const addSun = {
                            id: gsId,
                            tp: 1,
                            createdAt: Date.now()
                        }
                        await checkUser.update({ gs5: JSON.stringify([addSun]) })

                    } else {
                        const existingArray = JSON.parse(checkUser.gs5);
                        console.log(existingArray, "no");
                        existingArray[0].tp += 1;
                        existingArray[0].createdAt = Date.now();
                        await checkUser.update({
                            gs5: JSON.stringify(existingArray)
                        });
                        console.log("work");
                    }
                }

                commonController.successMessage(addotp, "Performance Added", res)
            } else {
                commonController.successMessage({}, "user not found", res)
            }

        } catch (e) {
            console.log(e);
            commonController.errorMessage(e, res)
        }
    }
    async getPerFor(payload: any, res: Response) {
        try {
            const { id } = payload;
            console.log(id, "sdsdsdd");

            var sql = `select * from Performances where userId = ${id} `;
            var data = await MyQuery.query(sql, { type: QueryTypes.SELECT });

            // Define a function to format timestamps
            function formatDate(timestamp) {
                const options = {
                    year: 'numeric' as const,
                    month: 'short' as const,
                    day: '2-digit' as const,
                    hour: '2-digit' as const,
                    minute: '2-digit' as const,
                    hour12: true as const,
                    timeZone: 'Asia/Kolkata', // Set the timezone to India Standard Time (IST)
                };
                return new Date(timestamp).toLocaleString(undefined, options);
            }

            // Iterate through the data array and format timestamps
            data.forEach((entry) => {
                entry.createdAt = formatDate(entry.createdAt);
                entry.updatedAt = formatDate(entry.updatedAt);
            });

            console.log(data, "////////");


            commonController.successMessage(data, "performance get successfully", res)

        } catch (e) {
            console.log(e);
            commonController.errorMessage(e, res)
        }
    }



    async addBankDetail(payload: any, res: Response) {
        try {
            const { id, upiId, bankName, bankAccNo, ifscCode, paytmNo, type } = payload;
            console.log(payload, "pay here");
            let checkUser = await db.Users.findOne({
                where: {
                    id
                }
            })
            if (checkUser) {
                console.log(checkUser.id);

                let check = await db.BankDetails.findOne({
                    where: {
                        userId: checkUser.id
                    }
                })
                if (!check) {

                    let addData = await db.BankDetails.create({
                        userId: checkUser.id, upiId, bankName, bankAccNo, ifscCode, paytmNo, type
                    })
                    commonController.successMessage(addData, "Data added successfully", res)
                } else {
                    await check.update({ upiId, bankName, bankAccNo, ifscCode, paytmNo, type })
                    commonController.successMessage(check, "data updated successfully", res)
                }


            } else {
                commonController.successMessage({}, "user not found", res)
            }
        } catch (e) {
            console.log(e);
            commonController.errorMessage(e, res)
        }
    }
    async verifyOtp(payload, res) {
        try {
            const { mobileNumber, otp } = payload;
            console.log(payload, "payload");
            let aa = `+91` + mobileNumber
            console.log(aa, "aa");
            // fix user 

            if (mobileNumber == process.env.Number) {
                if (otp == process.env.Otp) {
                    console.log("yes work");
                    let checkUser = await db.Users.findOne({
                        where: {
                            mobileNumber: aa
                        }
                    })
                    const token = jwt.sign(
                        {
                            id: checkUser.id,
                            mobileNumber: checkUser.mobileNumber,
                        },
                        process.env.TOKEN_SECRET,
                        { expiresIn: '30d' }
                    );
                    commonController.successMessage(token, "otp verified successfully", res)
                    return;
                } else {
                    commonController.successMessage({}, "otp not verified", res)
                    return;
                }

            }



            let checkUser = await db.Users.findOne({
                where: {
                    mobileNumber: aa
                }
            })
            console.log(checkUser, "lalalalalal");
            if (checkUser) {


                let checkOtp = await db.Otp.findOne({
                    where: {
                        userId: checkUser.id
                    }
                })
                if (checkOtp.active == true) {
                    commonController.successMessage({}, "otp expired", res)
                } else {
                    // Regenerate userId
                    let str = Math.random().toString(36).substr(2, 6).toUpperCase();
                    let user = `ARL${str}`;
                    console.log(checkOtp.otp, user, "daot");
                    if (checkOtp.otp == otp) {
                        // Check if userId already exists
                        let userWithUserId = await db.Users.findOne({ where: { uId: user } });
                        while (userWithUserId != null) {
                            // If userWithUserId exists, generate a new user ID and perform the query again
                            const str = Math.random().toString(36).substr(2, 6).toUpperCase();
                            user = `ARL${str}`;
                            userWithUserId = await db.Users.findOne({ where: { uId: user } });
                        }

                        // Now, outside the loop, you can proceed with the rest of the code
                        // and assume that you have a unique user ID


                        await checkOtp.update({ active: true })
                        let refered = commonController.generateOtp1()
                        let userWithUserId1 = await db.Users.findOne({ where: { refferedCode: refered } });
                        while (userWithUserId1 != null) {
                            refered = commonController.generateOtp1()
                            userWithUserId1 = await db.Users.findOne({ where: { refferedCode: refered } });
                        }
                        if (checkUser.refferedCode == null) {
                            console.log("null hai yan chaleya!!!!!!");
                            await checkUser.update({ active: true, refferedCode: refered, uId: user })
                        }

                        // add spin of user
                        let check = await db.Spins.findOne({
                            where: {
                                userId: checkUser.id
                            }
                        })
                        if (!check) {
                            let addSpin = await db.Spins.create({
                                userId: checkUser.id,
                                lastspin: Date.now(),
                                active: 1
                            })
                            let addTicket = await db.Tickets.create({
                                userId: checkUser.id,
                                tickets: 10
                            })
                        }
                        const token = jwt.sign(
                            {
                                id: checkUser.id,
                                mobileNumber: checkUser.mobileNumber,
                                unique: user
                            },
                            process.env.TOKEN_SECRET,
                            { expiresIn: '30d' }
                        );
                        commonController.successMessage(token, "otp verified successfully", res)
                    } else {
                        commonController.successMessage({}, "otp not verified", res)
                    }
                }

            } else {
                commonController.successMessage({}, "can't find user", res)
            }
        } catch (e) {
            console.log(e, "eeee");

            commonController.errorMessage(e, res)
        }
    }
    // resend otp to mobile
    async resendOtp(payload, res1) {
        try {
            const { mobileNumber } = payload;
            let aa = `+91` + mobileNumber
            console.log(aa, "aa");

            // check user exist

            let checkUser = await db.Users.findOne({
                where: {
                    mobileNumber: aa
                }
            })
            if (!checkUser) {
                commonController.successMessage({}, "user not found", res1)
            } else {

                let Otp = commonController.generateOtp()
                console.log(Otp, "here otp");

                var options = {
                    'method': 'GET',
                    'hostname': '2factor.in',
                    'path': `/API/V1/${process.env.otpkey}/SMS/${aa}/${Otp}/OTP1`,
                    'headers': {
                    },
                    'maxRedirects': 20
                };

                var req = https.request(options, function (res) {
                    var chunks: Buffer[] = [];

                    res.on("data", function (chunk) {
                        chunks.push(chunk);
                    });

                    res.on("end", async function (chunk) {
                        var body = Buffer.concat(chunks);
                        let cc = body.toString();
                        console.log({ cc }, "dfdfdfdf");

                        if (cc.includes('Insufficient Account Balance')) {
                            // Handle the "Insufficient Account Balance" error here
                            commonController.successMessage({}, "Insufficient Account Balance", res1);
                            return;
                        }

                        let moon = await db.Otp.findOne({
                            where: {
                                userId: checkUser.id
                            }
                        })
                        if (moon) {
                            let x = await moon.update({ otp: Otp })
                            commonController.successMessage(x, "otp send successfully", res1)
                        }



                    });

                    res.on("error", function (error) {
                        console.error(error);
                    });
                });

                req.end();
            }

        } catch (e) {
            console.log(e);

        }
    }
    // Your main function
    async sendotptomobile(payload, res) {
        try {
            const { mobileNumber, deviceId } = payload;
            console.log("API hit now", mobileNumber);

            let check = await db.Users.findOne({
                where: {
                    mobileNumber
                }
            });

            if (check) {
                console.log("User found");
                const token = jwt.sign(
                    {
                        id: check.id,
                        email: check.mobileNumber
                    },
                    process.env.TOKEN_SECRET,
                    { expiresIn: '30d' }
                );
                commonController.successMessage(token, "User Login successfully", res);
            } else {
                console.log("User not found");
                var sql = `select * from SegPercentages`;
                var data = await MyQuery.query(sql, { type: QueryTypes.SELECT });
                console.log(data[0].percentage, "first parameter");

                const segmentPercentages: { [key: number]: number } = {
                    1: data[0].percentage,
                    2: data[1].percentage,
                    3: data[2].percentage,
                };
                const selectedValue = this.calculateSegmentBasedOnPercentage(segmentPercentages);
                console.log(selectedValue, "here selected value");

                const str = Math.random().toString(36).substr(2, 6).toUpperCase();
                const userId = `ARL${str}`;

                let adddata = await db.Users.create({
                    mobileNumber, uId: userId, balance: 0, segmentType: selectedValue
                });

                const token = jwt.sign(
                    {
                        id: adddata.id,
                        email: adddata.mobileNumber
                    },
                    process.env.TOKEN_SECRET,
                    { expiresIn: '30d' }
                );

                // add user to matrix
                var sql1 = `select createdAt from Matrics  order by id desc limit 1`;
                var data1 = await MyQuery.query(sql1, { type: QueryTypes.SELECT });
                
             
                
                let dateObject = new Date(data1[0].createdAt);
                let dateString = dateObject.toISOString();
                let day = dateString.slice(8, 10);

                day = day.replace(/^0/, '');
             
                
                const d = new Date();
                let currentDate = d.getDate();
              
    
                if (currentDate == JSON.parse(day)) {
                    var sql1 = `UPDATE Matrics SET todayUsers = todayUsers + 1`;
                    var data1 = await MyQuery.query(sql1, { type: QueryTypes.UPDATE });
                
                } else {
                
                let addData = await db.Matrics.create({
                    todayUsers:1,
                    cashAppTotal:0,
                    dailyRewardTotal:0,
                    totalMatchS1:0,
                    totalMatchS2:0,
                    totalMatchS3:0,
                    totalMatch:0,
                    gamezopeTotal:0
                  })
                
                }

              
                commonController.successMessage(token, "User Login successfully", res);
            }

        } catch (e) {
            console.log(e);
            commonController.successMessage({}, "user not found", res);
        }
    }
    private calculateSegmentBasedOnPercentage(segmentPercentages: { [key: number]: number }): number {
        console.log("calculate hit");

        const randomValue = Math.random() * 100;
        let cumulativePercentage = 0;

        for (const segment in segmentPercentages) {
            cumulativePercentage += segmentPercentages[segment];
            if (randomValue <= cumulativePercentage) {
                return parseInt(segment, 10);
            }
        }

        return this.getDefaultSegment();
    }

    private getDefaultSegment(): number {
        return 1;
    }
}
export default new CodeController();
// export default new hello();

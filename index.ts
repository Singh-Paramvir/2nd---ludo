
import express, { Request, Response, NextFunction } from "express";

var cors: any = require("cors");

import auth from "./middleware/auth";
import userRoute from "./routes/user.routes";
import memberRoute from "./routes/member.routes";
import avatarRoute1 from "./routes/avatar1"
import adminRoute from "./routes/admin.routes"
import cronController from "./controllers/service/cronjob"
import http from 'http'
// import { Server } from 'socket.io';
import { Server } from 'socket.io';
import fs from 'fs'
const path = require("path");
var cron = require("node-cron");
const app = express();
app.options("*", cors());
var cors: any = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  const filePath = path.resolve("./public/pki-validation/75BAB5EED939DFAC6518805B4A0267C0.txt");

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Read the file and send its content as the response
    const fileContent = fs.readFileSync(filePath, "utf-8");
    res.send(fileContent);
  } else {
    // If the file doesn't exist, send a 404 Not Found response
    res.status(404).send("File not found");
  }
});
app.use("/avatars", express.static(__dirname + "/avatars"));
app.use("/", express.static(__dirname + "/avatars"));
const server = http.createServer(app)
const io = new Server(server, {
  transports: ['polling'],
  cors: {
    origin: "http://localhost:4000"
  }
});


io.on('connection', (socket) => {
  console.log('A user is connected');

  socket.on('message', (message) => {
    console.log(`message from ${socket.id} : ${message}`);
  })

  socket.on('disconnect', () => {
    console.log(`socket ${socket.id} disconnected`);
  })
})

export {io};


const port = process.env.PORT || 6000;

import db from "./models";

app.use(express.json());
app.use('/avatars', express.static(__dirname + '/resources/static/assets/avatars'))
app.use('/api/v1/auth', userRoute);
app.use('/api/v1/member', auth, memberRoute);
app.use("/api/v1/image1", auth, avatarRoute1);
app.use("/api/v1/admin",auth,adminRoute)


app.get("/api/v1/welcome",  (req, res) => {
  res.status(200).send("data get successfully ");
});


app.use((err: any, req: Request, res: Response, next: any) => {
  const status = err.status || 500;
  res.status(status).json({ error: { message: err } });
});

db.sequelize.sync().then(() => {
  server.listen(port, async () => {
    console.log("App Started");

     
   
    cron.schedule('0 0 * * *', async () => {
      console.log('running a task every night at 12:00 AM');
         await cronController.test();
      //   await cronjobstart.getAllBuyRequest()
      //  await tradeController.putOrderOnBinance();
      });                                    
  });
});


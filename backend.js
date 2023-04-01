const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const server = http.createServer(app);
const ipInfo = require("ipinfo")

let user = require("./router/user");
const config = require("./config/development");
let encrypt_ecrypt = require("./helpers/encrypt_decrypt");

const port = encrypt_ecrypt.decrypt(config.port);
//DB
require("./config/DB");

app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/user", user);

//socket
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  let obj = {
    date: new Date()
  }


  socket.on('test' , _userRes => {
    console.log('_userRes_userRes_userRes_userRes_userRes ')
    setTimeout(() => {
      let testObj = {
        "country": "India",
        "country_code": "IN",
        "city": "Chennai",
        "email": "test@gmail.com",
        "user_name": "test ddsd",        
        "date": "test ddsd"
      }
      socket.emit("test", testObj);
      console.log('tetsttt' , new Date().toString())
    }, 1000);
  })



  // await ipInfo((err, cLoc) => {
  //   console.log(cLoc, 'cLoccLoccLoccLoccLoc')
    // setInterval(() => {
    //   if(!err){
    //     socket.emit("test",{data: "some random data" , test: obj.date  , cLoc});
    //   }
    // },3000)

    
  // })

});

server.listen(port, () => {
  console.log("Backend is running on the port :" + port);
});

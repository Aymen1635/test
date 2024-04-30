require("dotenv").config();
const express = require("express");
const app = require("./socket/socket.js").app; 
const server = require("./socket/socket.js").server; 



const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const cookieParser=require('cookie-parser')
const cors=require("cors")
const corsOptions =require("./config/corsOption");

const PORT = process.env.PORT || 5000;
connectDB();

//security of the server 
app.use(cors(corsOptions));
app.use(cors());

app.use(cookieParser())
app.use(express.json());

//Routes
app.use("/auth",require("./routes/authRoutes"))
app.use('/users',require('./routes/userRouter'));
app.use('/demand',require('./routes/demandRoute'));
app.use('/sponsor',require('./routes/sponsorRoute'));
app.use('/notif',require('./routes/notificationRoutes'));
app.use('/equipements',require('./routes/EquipementRoute'));
app.use('/messages',require('./routes/message.routes'));


app.use("/",require("./routes/root"))

// firstime i connect to db
mongoose.connection.once("open", () => {
  console.log(`MongoDB connected on port ${PORT}`);
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});


mongoose.connection.on("error",()=>{
    console.log(err + " : Can't Connect To The Database");
})
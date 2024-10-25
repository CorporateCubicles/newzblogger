const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const adminRoute = require("./routes/adminRoutes");
const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute");

const isBlogExist = require('./middleware/blogExist');

let http = require('http').createServer(app);
let {Server} = require('socket.io');
let io = new Server(http, {});

const database_url = process.env.DATABASE_URL;
const dbName = 'newzblogger';

mongoose.connect(database_url);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once('open',()=>{
    console.log('Connection established to', dbName );
});


app.use(isBlogExist.isBlogExistorNot);

//for admin route
app.use('/', adminRoute);

app.use('/', userRoute);

app.use('/', blogRoute);

app.get('/', (req,res)=>{
    res.send("This is NEWZBLOGGER project ");
});

const PORTNo = process.env.PORT;

io.on("connection", function(socket){
    console.log('User connected');
    socket.on("new_post", function(formData){
        console.log(formData);
        socket.broadcast.emit("new_post", formData);
    });

    socket.on("new_comment", function(comment){
        socket.broadcast.emit("new_comment", comment);
    });

    socket.on("new_reply", function(reply){
        socket.broadcast.emit("new_reply", reply);
    });
});


// app.listen(PORTNo, ()=>{
//     console.log(`Server started at PORT No ${PORTNo}`);
// });


http.listen(PORTNo, ()=>{
    console.log(`Server started at PORT No ${PORTNo}`);
});
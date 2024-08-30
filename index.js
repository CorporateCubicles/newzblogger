const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const adminRoute = require("./routes/adminRoutes");

const database_url = process.env.DATABASE_URL;
const dbName = 'newzblogger';

mongoose.connect(database_url, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once('open',()=>{
    console.log('Connection established to', dbName );
})

app.use('/', adminRoute);

app.get('/', (req,res)=>{
    res.send("This is NEWZBLOGGER project ");
});

const PORTNo = process.env.PORT;

app.listen(PORTNo, ()=>{
    console.log(`Server started at PORT No ${PORTNo}`);
});
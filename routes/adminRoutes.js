const express = require('express');
const admin_router = express();

const adminController = require("../controller/adminController");

admin_router.get('/', adminController.blogController1 );

admin_router.get('/second', adminController.blogController2);

module.exports = admin_router;
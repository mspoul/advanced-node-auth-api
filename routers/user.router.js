const express = require("express");
const router = express.Router();

const {protect}=require('../middleware/auth');
const authorize=require('../middleware/authorize');

const {dashboardController}=require('../controllers/dashboardController');

router.get('/dashboard',protect,authorize("admin","user"),dashboardController);

module.exports=router;
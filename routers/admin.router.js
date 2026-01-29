const express = require("express");
const router = express.Router();

const { protect}  = require('../middleware/auth');

const {userdetails,userdelete}=require('../controllers/adminController');

const authorize = require("../middleware/authorize");


router.get('/users',protect, authorize("admin"),userdetails);
router.delete('/users/:id',protect,authorize("admin"),userdelete);

module.exports=router;
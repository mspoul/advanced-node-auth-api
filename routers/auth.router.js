const express = require("express");
const router = express.Router();

const { protect}  = require('../middleware/auth');
const validate = require("../middleware/validation");

const {signup,login,forgotPassController,resetPassController,profileController,updatePassController}=require('../controllers/authControllers');

const { signupSchema, loginSchema,forgotPassword,resetPassword,updatePassword } = require("../validations/auth.validation");


router.post("/signup",validate(signupSchema),signup);
router.post('/login', validate(loginSchema),login);

router.get('/profile', protect, profileController);

router.post('/forgot-password',validate(forgotPassword),forgotPassController);

router.put('/reset-password/:token',validate(resetPassword),resetPassController);

router.patch('/update-password',protect,validate(updatePassword),updatePassController);




module.exports = router;

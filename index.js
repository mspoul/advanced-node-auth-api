require('dotenv').config();

const jwt=require('jsonwebtoken');
const express = require('express');
const User = require('./models/User');
const { protect } = require('./middleware/auth');
const bcrypt=require('bcrypt');
const connectDB = require('./config/db');
const crypto = require('crypto');
const sendEmail = require('./config/email');

const app = express();
// Connect Database
connectDB();

app.use(express.json());

app.post('/api/auth/signup', async(req,res)=>{
    try{
        const {name,email,password} =req.body;

        const valid=await User.findOne({email:email});

        if(valid){
                return res.status(400).json({
                    message:"Email is alredy registered. so please login"
                });
        }

        const saltRounds=10;
        const hashPassword= await bcrypt.hash(password,saltRounds);
        
        const newUser=await User.create({
            name: name,
            email:email,
            password:hashPassword
        });

        const payload={
            id:newUser._id,role:newUser.role
        }
        const secret =process.env.JWT_SECRET_KEY;

        const token= jwt.sign(payload, secret,{ expiresIn: '24h'  });

        res.status(201).json({
            status:"success",
            token:token,
            data:{
                user:newUser
            }
        });

    }
    catch(err){
        res.status(500).json({ message: "Internal Server Error" });
    }
        

});

app.post('/api/auth/login', async(req,res)=>{
try{
    const {email,password}=req.body;


    const valid= await User.findOne({email:email}).select('+password');

        if(!valid){
                return res.status(401).json({
                    message:"User not found. so please register"
                });
        }
    
    const isMatch=await bcrypt.compare(password,valid.password);

    if(!isMatch){
        return res.status(401).json({
            message:"Incorrect password"
        });
    }

    const payload={
            id:valid._id,role:valid.role
        }
    const secret =process.env.JWT_SECRET_KEY;

    const token= jwt.sign(payload,secret,{ expiresIn: '24h'  });

    res.status(200).json({
        status: "success",
        token:token,
        data:{
            user:valid
        }
    });
}
catch(err){
    res.status(500).json({ message: "Internal Server Error" });
}

});

app.get('/api/auth/profile', protect, async (req, res) => {
    try {
        // Fetch the full user data from DB using the ID from the token
        const fullUser = await User.findById(req.user.id);

        res.status(200).json({
            status: "success",
            data: {
                user: fullUser
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Error fetching profile" });
    }
});

 

// --- FORGOT PASSWORD ---
app.post('/api/auth/forgot-password', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: "No user found with this email" });

        // 1. Generate Reset Token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // 2. Hash it & Save to DB
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpiry = Date.now() + 10 * 60 * 1000; // 10 mins
        await user.save();

        // 3. Prepare Email Content
        const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;
        const message = `
            <h1>Password Reset Request</h1>
            <p>Please click the link below to reset your password:</p>
            <a href="${resetUrl}">${resetUrl}</a>
            <p>If you didn't request this, please ignore this email.</p>
        `;

        // 4. Send Email using our utility
        await sendEmail({
            email: user.email,
            subject: 'Your Password Reset Link (Valid for 10 min)',
            message: message
        });

        res.status(200).json({ message: "Reset link sent to your email!" });

    } catch (err) {
        // If email fails, clear the DB fields we just set
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpiry = undefined;
            await user.save();
        }
        res.status(500).json({ message: "Error sending email. Please try again." });
    }
});

// --- RESET PASSWORD ---
app.put('/api/auth/reset-password/:token', async (req, res) => {
    try {
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpiry: { $gt: Date.now() }
        });

        if (!user) return res.status(400).json({ message: "Token is invalid or has expired" });

        user.password = await bcrypt.hash(req.body.password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;
        await user.save();

        res.status(200).json({ message: "Password updated successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 7. Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server active on port ${PORT}`));
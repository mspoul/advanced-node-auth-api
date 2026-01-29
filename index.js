require('dotenv').config();

const express = require('express');
 
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

app.use(express.json());


const { swaggerUi, swaggerSpec } = require("./docs/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const router = require("./routers/auth.router");
const adminrouter=require("./routers/admin.router");
const userrouter=require("./routers/user.router");

app.use('/api/auth',router);
app.use('/api/user',userrouter);
app.use('/api/admin',adminrouter);
 
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server active on port ${PORT}`));

const User=require("../models/User");

const userdetails=async(req,res)=>{
    try{
            const users=await User.find({});
    
            res.status(200).json({
                status: "success",
                data: {
                    users: users
                }
            });
        }
        catch(err){
            res.status(500).json({
                message:"Failed to fetch users"});
        }
}

const userdelete=async(req,res)=>{
        const { id }=req.params;
            try{
                await User.deleteOne({_id:id});
        
                res.status(200).json({
                    status:"success",
                    message: "the Specific user deleted successfully"
                });
            }
            catch(err){
                res.status(500).json({
                    message:"failed to delete"
                });
            }
}

module.exports={userdetails,userdelete}
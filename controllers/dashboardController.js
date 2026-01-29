

const dashboardController=(req,res)=>{
    try{
        res.status(200).json({
            status:"success",
            message:"dashboard details fetched successfully"
        });
    }
    catch(err){
        res.status(500).json({
            message:"failed to fetch"
        });
    }
}

module.exports={dashboardController}
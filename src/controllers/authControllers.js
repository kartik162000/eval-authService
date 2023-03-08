const services=require('../services/authServices');

const addUser=async (req,res)=>{
    try{
        const {username,password}=req.body;
        const  user=await services.addUser({username,password});
        res.status(201).json({user});
    }catch(err){
        res.status(500).json({error:err.message});
    }

}
const login=async (req,res)=>{
    try{
        console.log(req.body);
        const matchUser = await services.loginVerification(req.body);
        res.status(200).json(matchUser);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}
const verifyToken=async (req,res)=>{
    try{
        const verify = await services.verifyToken(req.headers.authorization.split(' ')[1]);
        if(verify){
            res.status(200).json({success:true});
        }
    }
    catch(error){
        res.status(401).json({error:error.message,success:false});
    }

}
module.exports={
    addUser,
    login,
    verifyToken
}
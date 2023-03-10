const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utils = require('../utils/addIntoRedis');
require('dotenv').config();

const addUser=async (data)=>{
    data.password = await bcrypt.hash(data.password, 10);
    const { email, password } = data;
    return await db.User.create({ email, password });
}

const loginVerification = async(data) => {
    
    const { email, password } = data;
    const user = await db.User.findOne({ where: { email } });
    const user_id = user.dataValues.id;
    if(user){
        const passwordMatch = await bcrypt.compare(password,user.password);
        if(passwordMatch){
            const token = jwt.sign({ email,user_id}, process.env.JWT_SECRET,{ expiresIn: '172800' });
            await utils.insertIntoRedis(token);
            return {token:token,success:true};
        }
        else
        {
            throw new Error('Invalid Password');
        
        }
    }
    throw new Error('Email does not exist');
}

const verifyToken = async(token) => {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await db.User.findOne({ where: { email: decoded.email } });
        if(user){
            return {success:true,user_id:decoded.user_id};
        }
        return {success:false};
}

        
module.exports={
    addUser,
    loginVerification,
    verifyToken
}
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utils = require('../utils/addIntoRedis');
require('dotenv').config();

const addUser=async (data)=>{
    data.password = await bcrypt.hash(data.password, 10);
    const { username, password } = data;
    return await db.User.create({ username, password });
}

const loginVerification = async(data) => {
    
    const { username, password } = data;
    const user = await db.User.findOne({ where: { username } });
    console.log(user);
    if(user){
        const passwordMatch = await bcrypt.compare(password,user.password);
        if(passwordMatch){
            const token = jwt.sign({ username }, process.env.JWT_SECRET,{ expiresIn: '172800' });
            await utils.insertIntoRedis(token);
            return {token:token,success:true};
        }
        else
        {
            throw new Error('Invalid Password');
        
        }
    }
    throw new Error('Username does not exist');
}

const verifyToken = async(token) => {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await db.User.findOne({ where: { username: decoded.username } });
        if(user){
            return true;
        }
        return false;
    }
        
module.exports={
    addUser,
    loginVerification,
    verifyToken
}
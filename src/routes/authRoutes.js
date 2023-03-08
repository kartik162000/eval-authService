const authController=require('../controllers/authControllers');
const express=require('express');
const router=express.Router();

router.post('/new',authController.addUser);
router.post('/login',authController.login);
router.get('/verify',authController.verifyToken);
module.exports=router;
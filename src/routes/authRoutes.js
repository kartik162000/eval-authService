const authController=require('../controllers/authControllers');
const express=require('express');
const router=express.Router();
const {validateUser}=require('../middlewares/validateSchema');

router.post('/new',validateUser,authController.addUser);
router.post('/login',validateUser,authController.login);
router.get('/verify',authController.verifyToken);
module.exports=router;
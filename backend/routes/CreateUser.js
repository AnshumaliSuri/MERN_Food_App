const express= require('express');
const router= express.Router();
const User= require('../models/User');
const { body,validationResult } = require('express-validator');
const bcrypt= require ('bcryptjs');
const jwt= require("jsonwebtoken");

const jwtSecret="SecretKeyForImlementationOfJWT%$";

router.post('/createuser',
body('email').isEmail(),
body('password','icorrect password').isLength({min:5}),
async (req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const salt=await bcrypt.genSalt(10);
    let secPassword= await bcrypt.hash(req.body.password,salt);

    try {
        await User.create({
            name: req.body.name,
            location:req.body.location,
            email: req.body.email,
            password:secPassword,
        }).then(res.json({success:true}))
        
    } catch (err) {
        console.log(err);
        res.json({success:false});
    }
});

router.post('/loginuser',
body('email').isEmail(),
body('password','icorrect password').isLength({min:5}),
async (req,res)=>{
    let email=req.body.email;

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        let userData = await User.findOne({email});
        if(!userData) {
            return res.status(400).json({errors:"Incorrect email or password"});
        }
        const pwdCompare=await bcrypt.compare(req.body.password,userData.password);
        if(!pwdCompare){
            return res.status(400).json({errors:"Incorrect email or password"});
        }

        const data={
            user:{
                id:userData.id
            }
        }
        const authToken=jwt.sign(data,jwtSecret);

        return res.json({success: true,authToken:authToken});
    } catch (err) {
        console.log(err);
        res.json({success:false});
    }
});

module.exports=router;
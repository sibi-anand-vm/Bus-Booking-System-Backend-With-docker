const User=require('../models/User');
const bcrypt=require('bcryptjs')
const {generateToken,reGenerateToken}=require('../utils/token')
const login=async (req,res)=>{
    try{
    const {name,password}=req.body;
    const user=await User.findOne({username:name})
    if(!user || !(await bcrypt.compare(password,user.password))){
        return res.status(400).send("Invalid credentials");
    }
    const token=generateToken(user);
    const  refreshtoken=reGenerateToken(user);
    res.status(200).json({token,refreshtoken});
}
catch(error){
    res.status(500).send({error:error.message});
}
}
const register=async (req,res)=>{
    try{
    const {name,password,role}=req.body;
    if (!name || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }

      const existingUser = await User.findOne({ username: name });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
    const user=new User({username:name,password:password,role:role})
    await user.save();
    res.status(201).json("User registered successfully");
    }
    catch(error){
        res.status(500).send({error:error.message});
    }
}
module.exports={register,login};
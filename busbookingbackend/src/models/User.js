const bcrypt=require('bcryptjs')
const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
password:{type:String,required:true},
    role:{type:String,enum:["admin","user"],default:"user"}
})
UserSchema.pre("save",async function(next) {
if(this.isModified("password")){  
    this.password=await bcrypt.hash(this.password,8);     
}
    next();           
})
module.exports=mongoose.model("UserCollections",UserSchema);      
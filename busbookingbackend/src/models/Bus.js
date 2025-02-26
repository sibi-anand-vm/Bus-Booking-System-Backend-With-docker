const mongoose=require('mongoose')
const BusSchema=new mongoose.Schema({
    busNumber:{type:String,required:true,unique:true},
    capacity:{type:Number,required:true},
route:{type:mongoose.Schema.Types.ObjectId,ref:"Routes",required:true}
})
module.exports=mongoose.model("Buscollections",BusSchema);
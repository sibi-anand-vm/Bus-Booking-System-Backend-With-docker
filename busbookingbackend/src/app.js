const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const mongoose=require('mongoose')

const authRoutes=require("./routes/authRoutes")
const allroutes=require('./routes/routeRoutes')
const allbookings=require("./routes/bookingRoutes")
const allbuses=require('./routes/busRoutes')
dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("MongoDB connected"))
    .catch((err)=>console.log("Error occured:",err))


app.use("/api/auth",authRoutes)
app.use("/api/routes",allroutes)
app.use("/api/bookings",allbookings)
app.use("/api/buses",allbuses)

app.get('/api/health',(req,res)=>{
    res.status(200).json({status:"OK",message:"App is running successfully"});
})
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
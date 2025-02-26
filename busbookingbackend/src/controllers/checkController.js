const mongoose = require('mongoose');
const Bus = require('../models/Bus'); // Adjust path if necessary
const dotenv=require('dotenv')
dotenv.config();
mongoose.connect("mongodb+srv://ADMIN:ACCESS_LOCk42@busappcluster.w9sxo.mongodb.net/BusBookingApp?retryWrites=true&w=majority&appName=BusAppCluster", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function checkBusRouteConnection() {
  const bus = await Bus.find().populate("route"); 
  console.log(bus);
}

checkBusRouteConnection();

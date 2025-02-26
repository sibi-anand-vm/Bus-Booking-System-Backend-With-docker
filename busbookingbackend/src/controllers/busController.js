const Bus = require('../models/Bus');
const Route = require('../models/Route');

const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find().populate('route');
    res.status(200).json({ message: 'Buses fetched successfully', buses });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


const getBusById = async (req, res) => {
  try {
    const { id } = req.params;

    const bus = await Bus.findById(id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    res.status(200).json({ message: 'Bus fetched successfully', bus });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};
const addBus = async (req, res) => {
  try {
    const { busNumber, capacity, routeId } = req.body;

    const existingBus = await Bus.findOne({ busNumber });
    if (existingBus) {
      return res.status(400).json({ message: "Bus with this number already exists" });
    }

    const route = await Route.findById(routeId);
    if (!route) {
      return res.status(400).json({ message: "Invalid route ID provided" });
    }

    const bus = new Bus({ busNumber, capacity, route: routeId });
    await bus.save();

    res.status(201).json({ message: "Bus added successfully", bus });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const updateBus = async (req, res) => {
  try {
    const { id } = req.params;
    const { busNumber, capacity, routeIds } = req.body;

    const bus = await Bus.findById(id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
if(routeIds && routeIds.trim()!='')
{
    const route = await Route.findById(routeIds);
    if (!route ) {
      return res.status(400).json({ message: 'Invalid route IDs provided' });
    }
  }
    bus.busNumber = busNumber || bus.busNumber;
    bus.capacity = capacity || bus.capacity;
    bus.route = routeIds || bus.route;
    await bus.save();

    res.status(200).json({ message: 'Bus updated successfully', bus });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

module.exports = {getAllBuses,getBusById, addBus, updateBus };
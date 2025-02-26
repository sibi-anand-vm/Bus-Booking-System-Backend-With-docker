const Route = require('../models/Route');

const addRoute = async (req, res) => {
  try {
    const { origin, destination, distance, duration } = req.body;

    if (!origin || !destination || !distance || !duration) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingRoute = await Route.findOne({ origin, destination });
    if (existingRoute) {
      return res.status(400).json({ message: 'Route already exists' });
    }

   
    const route = new Route({ origin, destination, distance, duration });
    await route.save();

    res.status(201).json({ message: 'Route added successfully', route });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

const updateRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const { origin, destination, distance, duration } = req.body;

    const route = await Route.findById(id);
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    route.origin = origin || route.origin;
    route.destination = destination || route.destination;
    route.distance = distance || route.distance;
    route.duration = duration || route.duration;
    await route.save();

    res.status(200).json({ message: 'Route updated successfully', route });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

const getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.status(200).json({ message: 'Routes fetched successfully', routes });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


const getRouteById = async (req, res) => {
  try {
    const { id } = req.params;

    const route = await Route.findById(id);
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    res.status(200).json({ message: 'Route fetched successfully', route });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

const deleteRoute = async (req, res) => {
  try {
    const { id } = req.params;

    const route = await Route.findByIdAndDelete(id);
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    res.status(200).json({ message: 'Route deleted successfully', route });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

module.exports = { addRoute, updateRoute, getAllRoutes, getRouteById, deleteRoute };
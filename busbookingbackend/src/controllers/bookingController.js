const Bus = require('../models/Bus');
const Booking = require('../models/Booking');

const searchBuses = async (req, res) => {
  try {
    const { origin, destination } = req.body;

    const buses = await Bus.find({})
      .populate('route')
      .exec(); 
     let availableBuses;
      if(!origin || !destination || origin.trim()==="" || destination.trim()===""){
        return res.status(200).json({ message: 'Buses found', buses: buses });
      }
      availableBuses = buses.filter((bus) => {
        return (
          bus.route &&
          bus.route.origin &&
          bus.route.destination &&
          bus.route.origin.toLowerCase() === origin.toLowerCase() &&
          bus.route.destination.toLowerCase() === destination.toLowerCase()
        );
      });

    if (availableBuses.length === 0) {
      return res.status(404).json({ message: 'No buses found for the specified route' });
    } 

    res.status(200).json({ message: 'Buses found', buses: availableBuses });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  } 

}

const bookBus = async (req, res) => {
  try {
    const { busId, seats } = req.body;
    const userId = req.user._id;

  
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

  
    if (seats > bus.capacity) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    const booking = new Booking({ user: userId, bus: busId, seats });
    await booking.save();

    bus.capacity -= seats;
    await bus.save();

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const booking = await Booking.findOne({ _id: id, user: userId });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const bus = await Bus.findById(booking.bus);
    bus.capacity += booking.seats;
    await bus.save();

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

module.exports = { searchBuses, bookBus, cancelBooking };
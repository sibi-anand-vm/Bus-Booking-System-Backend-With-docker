const express = require('express');
const { searchBuses, bookBus, cancelBooking } = require('../controllers/bookingController');
const {auth} = require('../middleware/auth.js');
const router = express.Router();


router.get('/',auth, searchBuses);
router.post('/', auth, bookBus);
router.delete('/:id', auth, cancelBooking);

module.exports = router;
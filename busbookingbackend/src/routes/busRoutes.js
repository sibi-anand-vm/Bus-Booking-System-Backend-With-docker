const express = require('express');
const { addBus, updateBus,getAllBuses,getBusById } = require('../controllers/busController.js');
const {auth,isAdmin}=require('../middleware/auth.js')
const router = express.Router();

router.get('/', getAllBuses);
router.get('/:id', getBusById);

router.post('/', auth, isAdmin,addBus);
router.put('/:id', auth, isAdmin,updateBus);

module.exports = router;
const express = require('express');
const { addRoute, updateRoute, getAllRoutes, getRouteById, deleteRoute } = require('../controllers/routeController');
const { auth, isAdmin } = require('../middleware/auth');
const router = express.Router();

router.get('/', getAllRoutes);
router.get('/:id', getRouteById);

router.post('/', auth, isAdmin, addRoute);
router.put('/:id', auth, isAdmin, updateRoute);
router.delete('/:id', auth, isAdmin, deleteRoute);

module.exports = router;         
const express = require('express');
const { getAvailableSlots, bookAppointment } = require('../controller/appointmentController');
const router = express.Router();

router.get('/slots', getAvailableSlots);
router.post('/book', bookAppointment);

module.exports = router;

const router = require('express').Router();
const userRoutes = require('./userRoutes');
const apptsRoutes = require('./appointmentsRoutes')

router.use('/user', userRoutes);
router.use('/appointments', apptsRoutes);



module.exports = router;

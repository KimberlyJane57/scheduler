const router = require('express').Router();
const userRoutes = require('./userRoutes');
const apptsRoutes = require('./appointmentsRoutes');
const emailRoutes = require('./emailRoutes')

router.use('/user', userRoutes);
router.use('/appointments', apptsRoutes);
router.use('/email', emailRoutes)



module.exports = router;

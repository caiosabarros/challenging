const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send('Hello!'); // I can place an HTML documentation here explaining how the API works.
})

router.use('/users', require('./users.js'))
router.use('/intellectual', require('./intellectual.js'))
router.use('/social', require('./social.js'))
router.use('/emotional', require('./emotional.js'))
router.use('/physical', require('./physical.js'))

// GET / user / logout
// GET /user/login

module.exports = router;

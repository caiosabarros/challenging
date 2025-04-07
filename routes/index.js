const router = require('express').Router();
const passport = require('passport');
const path = require('path');

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send('Hello!'); // I can place an HTML documentation here explaining how the API works.
})

router.use('/users', require('./users.js'))
router.use('/intellectual', require('./intellectual.js'))
router.use('/social', require('./social.js'))
router.use('/emotional', require('./emotional.js'))
router.use('/physical', require('./physical.js'))

// GET /user/login
router.get('/login', passport.authenticate('github'));
// GET / user / logout
router.logout('/logout', function (req, res, next) {
	req.logout(function (err) {
		if (err) { return next(err); }
		res.redirect('/');
	});
})

module.exports = router;

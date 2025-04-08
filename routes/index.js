const router = require('express').Router();
const passport = require('passport');
const path = require('path');


router.use('/', require('./swagger'));

router.get('/', (req, res) => {
	res.send('Hello!');
})

router.use('/users', require('./users'))
router.use('/intellectual', require('./intellectual'))
router.use('/social', require('./social'))
router.use('/emotional', require('./emotional'))
router.use('/physical', require('./physical'))

// GET /user/login
router.get('/login', passport.authenticate('github'));
// GET / user / logout
router.logout('/logout', function (req, res, next) {
	req.logout(function (err) {
		if (err) { return next(err); }
		res.redirect('/');
	});
})

router.get('/auth/status', (req, res) => {
	if (req.session && req.session.user) {
		res.status(200).json({
			isLoggedIn: true,
			user: {
				username: req.session.user.username,
				displayName: req.session.user.displayName,
				profileUrl: req.session.user.profileUrl
			}
		});
	} else {
		res.status(401).json({
			isLoggedIn: false,
			user: null
		});
	}
});

module.exports = router;

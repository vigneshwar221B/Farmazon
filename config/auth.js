module.exports = {
	ensureAuthenticated: function(req, res, next) {
		if (req.isAuthenticated()) {
			return next()
		}
		req.flash('error_msg', 'Please log in to view that resource')
		res.redirect('/login')
	},
	forwardAuthenticated: function(req, res, next) {
		if (!req.isAuthenticated()) {
			return next()
		}
		res.redirect('/dashboard')
	},
	isFarmer: function(req, res, next) {
		if (req.user.role == 'farmer') {
			return next()
		}
		req.flash('error_msg', "you're not a seller here")
		res.redirect('/dashboard')
	},
	isClient: function(req, res, next) {
		if (req.user.role == 'client') {
			return next()
		}
		req.flash('error_msg', 'you cant buy with a seller account')
		res.redirect('/dashboard')
	},
}

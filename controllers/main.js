
exports.getIndex = (req, res) => res.render('main/welcome')
exports.getDashboard = (req, res) =>
	res.render('main/dashboard', {
		user: req.user,
	})

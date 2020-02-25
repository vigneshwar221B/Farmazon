exports.getIndex = (req, res) => res.render('main/welcome')
exports.getDashboard = (req, res) => {
	if (req.user.role == 'farmer') return res.render('farmer/dashboard')
	res.render('client/dashboard')
}

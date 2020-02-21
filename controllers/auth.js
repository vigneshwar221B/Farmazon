const bcrypt = require('bcryptjs')
const passport = require('passport')

// Load User model
const User = require('../models/User')

exports.getLogin = (req, res) => res.render('auth/login')
exports.getRegister = (req, res) => res.render('auth/register')
exports.postLogin = (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/dashboard',
		failureRedirect: '/login',
		failureFlash: true,
	})(req, res, next)
}
exports.postRegister = (req, res) => {
	const { name, email, password, password2, role } = req.body
	let errors = []

	// if (!name || !email || !password || !password2) {
	//   errors.push({ msg: 'Please enter all fields' });
	// }

	// if (password != password2) {
	//   errors.push({ msg: 'Passwords do not match' });
	// }

	// if (password.length < 6) {
	//   errors.push({ msg: 'Password must be at least 6 characters' });
	// }

	if (errors.length > 0) {
		res.render('auth/register', {
			errors,
			name,
			email,
			password,
			password2,
			role,
		})
	} else {
		User.findOne({ email: email }).then(user => {
			if (user) {
				errors.push({ msg: 'Email already exists' })
				res.render('auth/register', {
					errors,
					name,
					email,
					password,
					password2,
					role,
				})
			} else {
				const newUser = new User({
					name,
					email,
					password,
					role,
				})

				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err
						newUser.password = hash
						newUser
							.save()
							.then(user => {
								req.flash(
									'success_msg',
									'You are now registered and can log in'
								)
								res.redirect('/login')
							})
							.catch(err => console.log(err))
					})
				})
			}
		})
	}
}

exports.getProfile = (req, res) => {
	res.render('main/profile')
}

exports.getFarmerRegister = (req, res) => {
	res.render('auth/farmerRegister')
}
exports.getLogout = (req, res) => {
	req.logout()
	req.flash('success_msg', 'You are logged out')
	res.redirect('/login')
}

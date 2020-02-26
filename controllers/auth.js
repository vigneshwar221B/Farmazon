const bcryptjs = require('bcryptjs')
const passport = require('passport')

// Load  model
const User = require('../models/User')
const Cart = require('../models/Cart')

exports.getLogin = (req, res) => res.render('auth/login')
exports.getRegister = (req, res) => res.render('auth/register')
exports.postLogin = (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/dashboard',
		failureRedirect: '/login',
		failureFlash: true,
	})(req, res, next)
}

exports.postRegister = async (req, res) => {
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
		return res.render('auth/register', {
			errors,
			name,
			email,
			password,
			password2,
			role,
		})
	}
	try {
		const user = await User.findOne({ email: email })

		//check if user already exists
		if (user) {
			errors.push({ msg: 'Email already exists' })
			return res.render('auth/register', {
				errors,
				name,
				email,
				password,
				password2,
				role,
			})
		}

		//Hash the password
		const salt = await bcryptjs.genSalt(10)
		const hashedPassword = await bcryptjs.hash(password, salt)

		//creating new user
		const newUser = new User({
			name,
			email,
			password: hashedPassword,
			role,
		})

		await newUser.save()

		if (role == 'client') {
			const cart = new Cart({
				products: [],
				user: newUser,
			})

			await cart.save()
		}

		req.flash('success_msg', 'You are now registered and can log in')
		res.redirect('/login')
	} catch (err) {
		console.log(err)
		req.flash('error_msg', err)
		if (role == 'farmer') return res.redirect('/farmerRegister')
		return res.redirect('/register')
	}
}

exports.getProfile = (req, res) => {
	if (req.user.role == 'farmer') return res.render('farmer/profile')
	res.render('client/profile')
}

exports.getFarmerRegister = (req, res) => {
	res.render('auth/farmerRegister')
}
exports.getLogout = (req, res) => {
	req.logout()
	req.flash('success_msg', 'You are logged out')
	res.redirect('/login')
}

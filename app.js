const express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	flash = require('connect-flash'),
	session = require('express-session'),
	morgan = require('morgan'),
	expressLayouts = require('express-ejs-layouts'),
	app = express()

// Passport Config
require('./config/passport')(passport)

// DB Config
const db = require('./config/keys').mongoURI

// Connect to MongoDB
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err))

//static files
app.use(express.static(__dirname + '/public'));

// EJS
app.set('view engine', 'ejs')
app.use(expressLayouts)

// Express body parser
app.use(express.urlencoded({ extended: true }))

//morgan setup
app.use(morgan('dev'))

// Express session
app.use(
	session({
		secret: 'bakuretsubakuretsulalala',
		resave: true,
		saveUninitialized: true,
	})
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())

// Global variables
app.use(function(req, res, next) {
	res.locals.success_msg = req.flash('success_msg')
	res.locals.error_msg = req.flash('error_msg')
	res.locals.error = req.flash('error')
	res.locals.isAuth = req.isAuthenticated()
	res.locals.user = req.user
	next()
})

// Routes
app.use('/', require('./routes/index.js'))
app.use('/', require('./routes/auth.js'))
app.use('/', require('./routes/farmer.js'))
app.use('/', require('./routes/client.js'))

const PORT = process.env.PORT || 8080

app.listen(PORT, () =>
	console.log(`Server started on http://localhost:${PORT}`)
)

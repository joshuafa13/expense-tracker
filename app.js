const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Handlebars = require('handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
const usePassport = require('./config/passport')
const app = express()
const PORT = process.env.PORT || 3000
require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
	secret: 'ThisIsMySecret',
	resave: false,
	saveUninitialized: true
}))

Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
	return arg1 == arg2 ? options.fn(this) : options.inverse(this)
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)

app.use((req, res, next) => {
	res.locals.isAuthenticated = req.isAuthenticated()
	res.locals.user = req.user
	next()
})

app.use(routes)

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:3000`)
})

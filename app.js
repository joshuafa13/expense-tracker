const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Handlebars = require('handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
const app = express()
const PORT = process.env.PORT || 3000
require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
	return arg1 == arg2 ? options.fn(this) : options.inverse(this)
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:3000`)
})

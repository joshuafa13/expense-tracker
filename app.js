const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Handlebars = require('handlebars')
const methodOverride = require('method-override')

const Record = require('./models/record')

const app = express()

const PORT = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
	return arg1 == arg2 ? options.fn(this) : options.inverse(this)
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
	console.log('mongodb error')
})

db.once('open', () => {
	console.log('mongodb connected')
})

app.get('/', (req, res) => {
	Record.find()
		.lean()
		.then(records => {
			const recordArr = records.map(record => Number(record.amount))
			totalAmount = recordArr.reduce((total, amount) => total + amount)
			console.log(recordArr, records)
		})
	Record.find()
		.lean()
		.then(records => res.render('index', { records, totalAmount }))
		.catch(error => console.log(error))
})

app.get('/records/new', (req, res) => {
	res.render('new')
})

app.post('/records', (req, res) => {
	const { name, date, category, amount } = req.body
	console.log(req.body)
	return Record.create({ name, date, category, amount })
		.then(() => res.redirect('/'))
		.catch(error => console.log(error))
})

app.get('/records/:id/edit', (req, res) => {
	const id = req.params.id
	return Record.findById(id)
		.lean()
		.then(record => res.render('edit', { record }))
		.catch(error => console.log(error))
})

app.put('/records/:id', (req, res) => {
	const id = req.params.id
	const { name, date, category, amount } = req.body
	return Record.findById(id)
		.then(record => {
			record.name = name
			record.date = date
			record.category = category
			record.amount = amount
			return record.save()
		})
		.then(() => res.redirect('/'))
		.catch(error => console.log(error))
})

app.delete('/records/:id', (req, res) => {
	const id = req.params.id
	return Record.findById(id)
		.then(record => record.remove())
		.then(() => res.redirect('/'))
		.catch(error => console.log(error))
})
app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`)
})

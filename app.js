const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const Record = require('./models/record')

const app = express()

const PORT = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

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
		.then(records => res.render('index', { records }))
		.catch(error => console.log(error))
})

app.get('/records/new', (req, res) => {
	res.render('new')
})

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`)
})

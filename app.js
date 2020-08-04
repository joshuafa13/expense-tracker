const express = require('express')
const mongoose = require('mongoose')

const app = express()

const PORT = 3000

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
	console.log('mongodb error')
})

db.once('open', () => {
	console.log('mongodb connected')
})

app.get('/', (req, res) => {
	res.send('Expense Tracker Web App')
})

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`)
})

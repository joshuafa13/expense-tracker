const mongoose = require('mongoose')
const Record = require('../record')

const category = ['household', 'transportation', 'entertainment', 'food', 'others']

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
	console.log('mongodb error')
})

db.once('open', () => {
	console.log('mongodb connected')
	for (let i = 1; i <= 5; i++) {
		Record.create({
			name: `測試 ${i}`,
			date: '2020-8-3',
			category: `${category[Math.floor(Math.random() * 5)]}`,
			amount: Math.floor(Math.random() * 100),
		})
	}
	console.log('done')
})

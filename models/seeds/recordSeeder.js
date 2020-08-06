const mongoose = require('mongoose')
const Record = require('../record')

const category = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
	console.log('mongodb error')
})

db.once('open', () => {
	console.log('mongodb connected')
	for (let i = 1; i <= 5; i++) {
		Record.create({
			name: `Random name ${i}`,
			date: '2020/8/3',
			category: `${category[Math.floor(Math.random() * 5)]}`,
			amount: Math.floor(Math.random() * 100),
		})
	}
	console.log('done')
})

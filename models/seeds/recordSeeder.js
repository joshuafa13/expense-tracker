const Record = require('../record')
const db = require('../../config/mongoose')

const category = ['household', 'transportation', 'entertainment', 'food', 'others']

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

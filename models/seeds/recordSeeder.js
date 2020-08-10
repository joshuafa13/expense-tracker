const Record = require('../record')
const db = require('../../config/mongoose')

const category = ['household', 'transportation', 'entertainment', 'food', 'others']

db.once('open', async () => {
	console.log('mongodb connected')
	for (let i = 1; i <= 5; i++) {
		await Record.create({
			name: `測試 ${i}`,
			date: '2020-8-3',
			category: `${category[Math.floor(Math.random() * 5)]}`,
			amount: Math.floor(Math.random() * 100),
		}).catch(error => console.log(error))
	}
	db.close()
	console.log('done')
})

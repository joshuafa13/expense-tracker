const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}
const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = {
	name: 'root',
	email: 'root@example.com',
	password: '12345678'
}
const SEED_RECORDS = [
	{
		name: '早餐',
		date: '2020-09-20',
		category: 'food',
		amount: '120',
		merchant: 'McDonald',
	},
	{
		name: '計程車',
		date: '2020-08-20',
		category: 'transportation',
		amount: '200',
		merchant: '',
	},
	{
		name: 'Tenet',
		date: '2020-09-20',
		category: 'entertainment',
		amount: '390',
		merchant: '電影院',
	}
]

db.once('open', () => {
	bcrypt
		.genSalt(10)
		.then(salt => bcrypt.hash(SEED_USER.password, salt))
		.then(hash => User.create({
			name: SEED_USER.name,
			email: SEED_USER.email,
			password: hash
		}))
		.then(user => {
			const userId = user._id
			return Promise.all(Array.from(
				{ length: 3 },
				(_, i) => Record.create({
					name: SEED_RECORDS[i].name,
					category: SEED_RECORDS[i].category,
					merchant: SEED_RECORDS[i].merchant,
					date: SEED_RECORDS[i].date,
					amount: SEED_RECORDS[i].amount,
					userId
				})
			))
		})
		.then(() => {
			console.log('recordSeeder is done')
			process.exit()
		})
})


// const Record = require('../record')
// const db = require('../../config/mongoose')

// const category = ['household', 'transportation', 'entertainment', 'food', 'others']

// db.once('open', async () => {
// 	console.log('mongodb connected')
// 	for (let i = 1; i <= 5; i++) {
// 		await Record.create({
// 			name: `測試 ${i}`,
// 			date: '2020-08-03',
// 			category: `${category[Math.floor(Math.random() * 5)]}`,
// 			amount: Math.floor(Math.random() * 100),
// 		}).catch(error => console.log(error))
// 	}
// 	db.close()
// 	console.log('done')
// })

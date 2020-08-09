const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/', (req, res) => {
	Record.find()
		.lean()
		.sort({ date: 'desc' })
		.then(records => {
			let totalAmount = 0
			if (records.length !== 0) {
				totalAmount = records.map(record => Number(record.amount)).reduce((total, amount) => total + amount)
			}
			res.render('index', { totalAmount, records })
		})
})

router.get('/filter/:category', (req, res) => {
	Record.find({ category: `${req.params.category}` })
		.lean()
		.sort({ date: 'desc' })
		.then(records => {
			let totalAmount = 0
			if (records.length !== 0) {
				totalAmount = records.map(record => Number(record.amount)).reduce((total, amount) => total + amount)
			}
			const params = req.params.category
			res.render('index', { records, totalAmount, params })
		})
})

module.exports = router

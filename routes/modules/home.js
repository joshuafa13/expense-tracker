const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/', (req, res) => {
	const userId = req.user._id
	Record.find({ userId })
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
	const userId = req.user._id
	return Record.find({ userId, category: req.params.category })
		.lean()
		.sort({ date: 'desc' })
		.then(records => {
			let totalAmount = 0
			if (records.length !== 0) {
				totalAmount = records.map(record => Number(record.amount)).reduce((total, amount) => total + amount)
			}
			const category = req.params.category
			res.render('index', { records, totalAmount, category })
		})
})

router.get('/filter/month/:ym', (req, res) => {
	const userId = req.user._id
	return Record.find({ userId })
		.lean()
		.sort({ date: 'desc' })
		.then(records => {
			const selectedRecords = []
			records.forEach(record => {
				if (record.date.includes(req.params.ym)) {
					selectedRecords.push(record)
				}
			})
			// console.log(req.params.ym)
			records = selectedRecords
			let totalAmount = 0
			if (records.length !== 0) {
				totalAmount = records.map(record => Number(record.amount)).reduce((total, amount) => total + amount)
			}
			const ym = req.params.ym
			res.render('index', { records, totalAmount, ym })
		})
})

module.exports = router

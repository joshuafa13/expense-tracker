const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/', (req, res) => {
	Record.find()
		.lean()
		.sort({ _id: 'asc' })
		.then(records => {
			const recordArr = records.map(record => Number(record.amount))
			totalAmount = recordArr.reduce((total, amount) => total + amount)
			res.render('index', { records, totalAmount })
		})
		.catch(error => console.log(error))
})

module.exports = router

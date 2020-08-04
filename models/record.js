const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
	name: {
		type: String,
	},
	date: {
		type: Date,
	},
	category: {
		type: String,
	},
	amount: {
		type: String,
	},
})

module.exports = mongoose.model('Record', recordSchema)

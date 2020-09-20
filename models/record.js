const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
	name: {
		type: String,
	},
	date: {
		type: String,
	},
	category: {
		type: String,
	},
	amount: {
		type: Number,
	},
	merchant: {
		type: String,
	},
	userId: {  // 加入關聯設定
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: true,
		required: true
	}
})

module.exports = mongoose.model('Record', recordSchema)

const Category = require('../category')
const db = require('../../config/mongoose')

const categories = ['household', 'transportation', 'entertainment', 'food', 'others']

db.once('open', () => {
	console.log('mongodb connected')
	for (let i = 0; i < categories.length; i++) {
		Category.create({ name: `${categories[i]}` })
			.then(() => {
				db.close()
				console.log('done')
			})
			.catch(error => console.log(error))
	}
})

const Category = require('../category')
const db = require('../../config/mongoose')

const categories = ['household', 'transportation', 'entertainment', 'food', 'others']

const icons = [
	'<i class="fas fa-home"></i>',
	'<i class="fas fa-shuttle-van"></i>',
	'<i class="fas fa-grin-beam"></i>',
	'<i class="fas fa-utensils"></i>',
	'<i class="fas fa-pen"></i>',
]

db.once('open', () => {
	console.log('mongodb connected')
	for (let i = 0; i < categories.length; i++) {
		Category.create({
			name: `${categories[i]}`,
			icon: `${icons[i]}`,
		})
	}
	console.log('done')
})

const express = require('express')
const app = express()

const PORT = 3000

app.get('/', (req, res) => {
	res.send('Expense Tracker Web App')
})

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`)
})

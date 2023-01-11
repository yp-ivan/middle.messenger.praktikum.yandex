const express = require('express')
const app = express()

const HOSTNAME = process.env.HOSTNAME || 'localhost'
const PORT = process.env.PORT || 3000

app.use(express.static('dist'))

app.listen(PORT, HOSTNAME, () => {
  console.log(`App messenger on http://${HOSTNAME}:${PORT}`)
})

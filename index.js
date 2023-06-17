const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;



const corsConfig = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE']
}
app.use(cors(corsConfig))
app.options("", cors(corsConfig))
app.use(express.json())


app.get('/', (req, res) => {
  res.send('supper herro server site is ranning')
})





app.listen(port, () => {
  console.log(`to server site ranning is ${port}`)
})
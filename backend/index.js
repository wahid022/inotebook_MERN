const connectToMongo=require('./db');
const express = require('express');
const app = express();
var cors = require('cors') 
const port = 8000;

app.use(express.json());
app.use(cors())


app.get('/', (req, res) => {
  res.send('Hello Wahi')
})

// Available Routes 
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/note'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

connectToMongo();
const express = require('express');
const bodyParser = require('body-parser');
const { saveFile, getGameId, getGameInfo } = require('./apiInteraction')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.post('/image', async (req, res) => {
  let imgData = req.body.data.split(',');
  let dataString = await saveFile(imgData[1])
  let gameId = getGameId(dataString.split('\n'))
  res.json(dataString)
});

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  console.log('Hitting this finally', req.body)
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/', async (req, res) => {
  let info = await getGameInfo(179460)
  res.json(info)
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
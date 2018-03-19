const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'src/html')));
app.use(express.static(path.join(__dirname, 'src/static')));

app.get('/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('foo');
});

const port = 3000;

const server = app.listen(port, () => {
  console.log('Server started');
});

module.exports = {
  app: app
};


const express = require('express');
const app = express();

function getPi() {
  let sum = 0;
  for (let n = 0; n < 10000000000; n++) {
    let mult = n % 2 === 0 ? 1 : -1;
    sum += mult * (1 / (2 * n + 1));
  }
  return sum * 4;
}

app.get('/', function (req, res) {
  const pi = getPi();
  res.send(`Pi Value, ${pi}`);
});

app.get('/hello', function (req, res) {
  res.send(`hello world`);
});

app.listen(3000);

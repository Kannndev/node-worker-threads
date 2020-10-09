const express = require('express');
const { Worker } = require('worker_threads');

const app = express();

app.get('/', function (req, res) {
  const worker = new Worker(__dirname + '/worker.js', {
    workerData: { ping: 'pong' },
  });
  worker.on('message', (pi) => {
    res.send(`Pi Value, ${pi}`);
  });
  worker.on('error', (err) => {
    res.status({ status: 500 }).json({ message: err.message });
  });
  worker.on('exit', (code) => {
    if (code !== 0) {
      res.status({ status: 500 }).json({ message: code });
    }
  });
  worker.postMessage('getMeThePiValue');
});

app.get('/hello', function (req, res) {
  res.send(`hello world`);
});

app.listen(3000);

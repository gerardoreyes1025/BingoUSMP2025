const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let drawnNumbers = [];

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/number', (req, res) => {
  const { number } = req.body;
  if (typeof number !== 'number' || number < 1 || number > 75) {
    return res.status(400).json({ error: 'Número inválido' });
  }
  if (!drawnNumbers.includes(number)) {
    drawnNumbers.push(number);
    broadcast({ type: 'update', numbers: drawnNumbers });
  }
  res.sendStatus(200);
});

app.post('/deleteNumber', (req, res) => {
  const { number } = req.body;
  if (typeof number !== 'number' || number < 1 || number > 75) {
    return res.status(400).json({ error: 'Número inválido' });
  }
  if (!drawnNumbers.includes(number)) {
    drawnNumbers.push(number);
    broadcast({ type: 'delete', numbers: drawnNumbers });
  }
  res.sendStatus(200);
});

app.post('/animation', (req, res) => {
  const { letter } = req.body;
  if (typeof letter !== 'string' || !['l', 'u', 'a'].includes(letter)) {
    return res.status(400).json({ error: 'Letra especial inválida' });
  }
  broadcast({ type: 'animation', letter });
  res.sendStatus(200);
});

app.post('/special', (req, res) => {
  const { letter } = req.body;
  // console.log("Letra especial recibida:", letter);
  if (typeof letter !== 'string' || !['L', 'U', 'APAGÓN'].includes(letter)) {
    return res.status(400).json({ error: 'Letra especial inválida' });
  }
  broadcast({ type: 'special', letter });
  res.sendStatus(200);
});



app.post('/reset', (req, res) => {
  drawnNumbers = [];
  broadcast({ type: 'update', numbers: drawnNumbers });
  res.sendStatus(200);
});

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({ type: 'update', numbers: drawnNumbers }));
});

function broadcast(data) {
  const msg = JSON.stringify(data);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
}

const PORT = 3000;
const HOST = '0.0.0.0'; // Esto lo hace accesible desde tu IP local

server.listen(PORT, HOST, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

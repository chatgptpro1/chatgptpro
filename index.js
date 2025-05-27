// Este proxy usa Node.js com Express para redirecionar e mascarar o acesso ao sharedchat.fun

const express = require('express');
const request = require('request');
const app = express();
const PORT = process.env.PORT || 3000;

// Permite CORS (se quiser restringir, pode ajustar)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Proxy básico
app.use('/', (req, res) => {
  const url = `https://sharedchat.fun${req.url}`;
  req.pipe(request({ url, followRedirect: true })).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Proxy rodando na porta ${PORT}`);
});

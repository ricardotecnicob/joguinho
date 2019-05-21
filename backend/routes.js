const express = require('express');

const routes = express.Router();

const Jogadores = require('./src/controller/Jogadores');

routes.get('/users', Jogadores.index);
routes.get('/users/:id', Jogadores.indexId);
routes.post('/users', Jogadores.store);
routes.post('/users/:id/:pts', Jogadores.pontos);

module.exports = routes;
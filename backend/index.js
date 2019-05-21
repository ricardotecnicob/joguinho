const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://joguinho:punk1995@ds157136.mlab.com:57136/joguinho', {
    useNewUrlParser: true
});

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(process.env.PORT || 4000, () => {
    console.log(':] Servidor Rodando....');
});


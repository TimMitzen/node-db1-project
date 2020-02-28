const express = require('express');

const server = express();

const accountRouter = require('./routes/accountRoute')

server.use(express.json());
server.use('/accounts', accountRouter);

module.exports = server;
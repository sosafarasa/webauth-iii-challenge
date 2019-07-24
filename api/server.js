const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv')

//

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

//

dotenv.config();
const server = express();

//


server.use(helmet());
server.use(express.json());
server.use(cors());

//

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

//

server.get('/', (req, res) => {
    res.send(`<h1>Sanity Check...</h1>`);
})

module.exports = server;
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');
const secrets = require('../config/secrets');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ 
                    message: `Welcome ${user.username}`,
                    token,
                });

            } else {
                res.status(401).json({ message: 'Please provide valid credentials.'})
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

function generateToken(user) {
    const jwtPayload = {
        subject: user.id,
        username: user.username,
        department: user.department
    }

    const jwtOptions = {
        expiresIn: '1d',
    }

    return jwt.sign(jwtPayload, secrets.jwtSecret, jwtOptions)
};

module.exports = router;
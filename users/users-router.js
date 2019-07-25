const router = require('express').Router();

const Users = require('./users-model');
const restricted = require('../auth/restricted');

router.get('/', restricted, (req, res) => {
    const department = req.jwtToken.authorization;

    Users.find(department)
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json(err)
        });
})

module.exports = router;
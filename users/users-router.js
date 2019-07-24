const router = require('express').Router();

const Users = require('./users-model');

router.get('/', (req, res) => {
    const departmet = req.jwtToken.department;

    Users.find(departmet)
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
})

module.exports = router;
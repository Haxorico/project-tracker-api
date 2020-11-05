const express = require('express');
const router = express.Router();
const loginService = require('../services/auth');

router.get('/', async (req, res, next) => {
    const token = req.header('Authorization');
    loginService.VerifyToken(token).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(401).json(err);
    });
});

router.post('/', async (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;
    loginService.LoginUser(name, password).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(401).json(err);
    });
});

module.exports = router;

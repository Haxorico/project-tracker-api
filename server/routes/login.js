const express = require('express');
const router = express.Router();
const ent_name = 'users';
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const KEY = "_[Ask#Al3xXx!]_";
const EXP_TIME = '10s';

function LoginUser(user_name, user_password) {
    return new Promise((resolve, reject) => {
        
        const collection = require('../libs/mongodb').getCollection(ent_name);
        user_password = md5(user_password);
        collection.find({ name: user_name }).next().then(user => {
            if (user == null){
                reject({err: "User not found"});
                return;
            }
            if (user.password == user_password) {
                const token = jwt.sign({ expiresIn: EXP_TIME, data: user }, KEY);
                resolve({ user, token });
            }
            //#For_Alex - I know it is not safe to give this message. this is for testing. Can change this later 
            else {
                reject({err: "password does NOT match"});
            }
        }).catch(err => {
            reject(err);
        });
    });
}

router.get('/:token', async (req, res, next) => {
    const token = req.params.token;
    console.log("TOKEN => ", token);

    if (token == undefined) {
        console.log("NO TOKEN GIVEN", req.params);
        res.json("NO TOKNE GIVEN!");
    }
    jwt.verify(token, KEY, function (err, decoded) {
        //#ASK_ALEX - It never checks the expired time, even tough I set it to 10 seconds.
        if (err) {
            res.json(err);
            return;
        }
        res.json(decoded);
    });
});

router.post('/', async (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;
    LoginUser(name, password).then(data => {
        console.log("Data found => ", data);
        res.json(data);
    }).catch(err => {
        console.log("Error found => ", err);
        res.json(err);
    });
});

module.exports = router;

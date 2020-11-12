const jwt = require('jsonwebtoken');
const KEY = "_[Ask#Al3xXx!]_";
const ent_name = 'users';
const md5 = require('md5');
const EXP_TIME = '1d';

function VerifyToken(token) {
    return new Promise((resolve, reject) => {
        try {
            if (token == undefined) {
                reject("NO TOKNE GIVEN!");
                return;
            }
            jwt.verify(token, KEY, function (err, decoded) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(decoded);
            });
        }
        catch (e) {
            reject(e);
        }
    });
}

function LoginUser(user_name, user_password) {
    return new Promise((resolve, reject) => {
        const collection = require('../libs/mongodb').getCollection(ent_name);
        user_password = md5(user_password);
        collection.find({ name: user_name }).next().then(user => {
            if (user == null) {
                reject({ err: "User not found" });
                return;
            }
            if (user.password == user_password) {
                const token = jwt.sign({ data: user }, KEY, { expiresIn: EXP_TIME });
                resolve({ user, token });
            }
            //#For_Alex - I know it is not safe to give this message. this is for testing. Can change this later 
            else {
                reject({ err: "password does NOT match" });
            }
        }).catch(err => {
            reject(err);
        });
    });
}

function Auth(req, res, next) {
    const token = req.header('Authorization');
    VerifyToken(token).then(data => {
        next();
    }).catch(err => {
        res.status(401).json(err);
    });
}
module.exports = { Auth, LoginUser, VerifyToken }

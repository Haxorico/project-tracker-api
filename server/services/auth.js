/* const ent_name = 'users'; */
const jwt = require('jsonwebtoken');
const KEY = "_[Ask#Al3xXx!]_";
/* const EXP_TIME = 1000 * 60 * 2;
 */
/* function LoginUser(user_name, user_password) {
    return new Promise((resolve, reject) => {
        const collection = require('../libs/mongodb').getCollection(ent_name);
        user_password = md5(user_password);
        collection.find({ name: user_name }).next().then(user => {
            if (user.password == user_password) {
                const token = jwt.sign({ exp: EXP_TIME, data: user }, KEY);
                resolve({ user, token });
            }
            else {
                reject(false);
            }
        }).catch(err => {
            reject(err);
        });
    });
} */
/* 
function VerifyToken(token) {
    try {
        let decoded = jwt.verify(token, KEY);
        if (decoded)
            return true;
    } catch (err) {
        return err;
    }
} */

module.exports = (req, res, next) => {
    try {
        const token = req.query.token;
        if (token == undefined)
        {
            console.log("NO TOKEN GIVEN",req.query);
            throw "NO TOKNE GIVEN!";
        }
        const decoded = jwt.verify(token, KEY);
        if (decoded)
            next();
        else {
            //console.log(decoded);
            throw decoded;
        }
    }
    catch (e){
        console.log(e);
        res.status(401).json(e);
    }
}

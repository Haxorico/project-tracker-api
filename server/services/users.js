const ent_name = 'users';
const jwt = require('jsonwebtoken');
const KEY = "Ask_Alex";

function GetUsers(query_paramters) {
  const collection = require('../libs/mongodb').getCollection(ent_name);
  return new Promise((resolve, reject) => {
    collection.find(query_paramters).toArray((error, users) => {
      resolve(users);
    });
  });
}

function GetUser(query_paramters) {
  const collection = require('../libs/mongodb').getCollection(ent_name);
  return new Promise((resolve, reject) => {
    collection.find(query_paramters).next().then(user => {
      resolve(user);
    });
  });
}

function AddUser(user_to_add) {
  const collection = require('../libs/mongodb').getCollection(ent_name);
  collection.insertOne(user_to_add);
}

function UpdateUser(user_to_update) {
  const collection = require('../libs/mongodb').getCollection(ent_name);
  collection.updateOne({ id: user_to_update.id }, user_to_update);
}

function DeleteUser(user_to_delete) {
  const collection = require('../libs/mongodb').getCollection(ent_name);
  collection.deleteOne({ id: user_to_delete.id });
}

function LoginUser(user_name, user_password) {
  const collection = require('../libs/mongodb').getCollection(ent_name);
  const md5 = require('md5');
  user_password = md5(user_password);

  return new Promise((resolve, reject) => {
    collection.find({ name: user_name }).next().then(user => {
      if (user.password == user_password) {
        let token = jwt.sign(user, KEY);
        resolve({user, token});
      }
      else {
        resolve(false);
      }
    });
  });
}

function VerifyToken(token){
  try {
    let decoded = jwt.verify(token, KEY);
    if (decoded)
    return true;
  } catch(err) {
    return false;
  }
}
module.exports = { GetUsers, GetUser, AddUser, UpdateUser, DeleteUser, LoginUser, VerifyToken }

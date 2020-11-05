const ent_name = 'users';

function GetUsers(query_paramters) {
  console.log("Im in the GetUsers Services");
  return new Promise((resolve, reject) => {
    const collection = require('../libs/mongodb').getCollection(ent_name);
    collection.find(query_paramters).toArray((error, users) => {
      if (error)
        {
          reject(error);
          return;
        }
      resolve(users);
    });
  });
}

function GetUser(query_paramters) {
  console.log("Im the singe get user");
  return new Promise((resolve, reject) => {
    const collection = require('../libs/mongodb').getCollection(ent_name);
    collection.find(query_paramters).next().then(user => {
      if (user == null){
        reject("User not found");
        return;
      }
      resolve(user);
    }).catch(err => {
      reject(err);
    });
  });
}

function AddUser(user_to_add) {
  const collection = require('../libs/mongodb').getCollection(ent_name);
  return new Promise((resolve, reject) => {
    collection.insertOne(user_to_add).then(user => {
      resolve(user);
    }).catch(err => {
      reject(err);
    });
  });
}

function UpdateUser(user_to_update) {
  return new Promise((resolve, reject) => {
    const collection = require('../libs/mongodb').getCollection(ent_name);
    collection.updateOne({ id: user_to_update.id }, { $set: user_to_update }).then(data => {
      if (data.matchedCount < 1) {
        reject(user_to_update.id + " <- This ID was NOT Found");
        return;
      }
      resolve({});
    }).catch(err => {
      reject(err);
    });
  });
}

function DeleteUser(user_to_delete) {
  return new Promise((resolve, reject) => {
    const collection = require('../libs/mongodb').getCollection(ent_name);
    collection.deleteOne({ id: user_to_delete.id }).then(data => {
      if (data.deletedCount < 1) {
        reject(user_to_delete.id + " <- This ID was NOT Found");
        return;
      }
      resolve({});
    }).catch(err => {
      reject(err);
    });
  });
}

module.exports = { GetUsers, GetUser, AddUser, UpdateUser, DeleteUser }

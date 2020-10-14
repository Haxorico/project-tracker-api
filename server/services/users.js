const ent_name = 'users';

//#ASK_ALEX: If I want to sort users by their rank. Should I add a function here or should the service only handle getting and updating data?

function GetUsers(query_paramters) {
  //#ASK_ALEX Should I declare db and collection every time?
  //If I ust have them as global variables, will they be updated WITH the DB?
  const db = require('../libs/mongodb').getDb();
  const collection = db.collection(ent_name);
  return new Promise((resolve, reject) => {
    collection.find(query_paramters).toArray((error, users) => {
      resolve(users);
    });
  });
}

function GetUser(query_paramters){
  const db = require('../libs/mongodb').getDb();
  const collection = db.collection(ent_name);
  return new Promise((resolve, reject) => {
    collection.find(query_paramters).next().then(user => {
      resolve(user);
    });
  });
}

function AddUser(user_to_add){
  const db = require('../libs/mongodb').getDb();
  const collection = db.collection(ent_name);
  console.log(user_to_add);
  collection.insertOne(user_to_add);
}

function UpdateUser(user_to_update){
  const db = require('../libs/mongodb').getDb();
  const collection = db.collection(ent_name);
  collection.updateOne({ id: user_to_update.id }, user_to_update);
}

function DeleteUser(user_to_delete){
  const db = require('../libs/mongodb').getDb();
  const collection = db.collection(ent_name);
  collection.deleteOne({ id: user_to_delete.id });
}

module.exports = { GetUsers, GetUser, AddUser, UpdateUser, DeleteUser }

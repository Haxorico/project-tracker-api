const express = require('express');
const router = express.Router();


async function GetUsers(obj) {
//#ASK_ALEX Should I declare db and collection every time?
    //If I ust have them as global variables, will they be updated WITH the DB?
    const db = require('../libs/mongodb').getDb();
  const collection = db.collection('users');
  console.log("GetUsers is running");
  //#ASK_ALEX Should I return the data as raw and let the route translate it to JSON if needed?
  collection.find(obj).toArray((error, users) => {
    console.log("Returning Data"); 
    resolve(users);
    //return Promise.resolve(users);
  });
}

module.exports = { GetUsers }
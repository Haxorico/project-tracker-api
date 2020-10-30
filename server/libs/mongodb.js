const MongoClient = require('mongodb').MongoClient;

const host = process.env.DATABASE_HOST || 'localhost';

// Connection URL
const url = `mongodb://pt:Google1234@${host}:27017`;

// Database Name
const dbName = 'project-tracker';

let db;

// Use connect method to connect to the server
MongoClient.connect(url,function(err, client) {
    if (err) {
      return;
    }
    console.log("Connected successfully to mongoDB server");

    db = client.db(dbName);
});

const connectionMiddleware = (req, res, next) => {
  if (db) {
    req.db = db;
    return next();
  }

  MongoClient.connect(url,function(err, client) {
    if (err) {
      return res.status(500).send('Error connection to Database. Please try again later.');
    }
    db = client.db(dbName);
    req.db = db;
    return next();
  });
}

const getDb = () => {
  return db;
}

const getCollection = (name) => {
  return getDb().collection(name);
}

module.exports = { connectionMiddleware, getDb, getCollection}


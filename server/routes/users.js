const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const db = require('../libs/mongodb').getDb();

  const collection = db.collection('users');
  collection.find({}).toArray((error, users) => {
    res.json(users);
  });
});

module.exports = router;

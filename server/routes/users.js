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

router.get('/:id', function (req, res) {
  const db = require('../libs/mongodb').getDb();
  const collection = db.collection('users');
  collection.find({ id: req.params.id }).next().then(user => {
    res.json(user);
  });
});

/* POST user. */
router.post('/', async (req, res, next) => {
  const db = require('../libs/mongodb').getDb();
  db.collection('users').insertOne(req.body)
});

/* PUT (update) user. */
router.put('/:id', async (req, res, next) => {
  const db = require('../libs/mongodb').getDb();
  db.collection('users').updateOne({ id: req.params.id }, { $set: req.body });
});

/* DELETE user. */
//#ASK_ALEX - This function is never being called!
router.delete('/:id', function (req, res) {
  const db = require('../libs/mongodb').getDb();
  const dd = req.params.id;
  console.log("###########");
  console.log(dd);
  db.collection.deleteOne({ id: dd }).then().catch(err => { 
    console.log("#######");
    console.log(err);
  });
})


module.exports = router;

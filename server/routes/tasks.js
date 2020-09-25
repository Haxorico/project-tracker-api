const express = require('express');
const router = express.Router();
const COLLECTION_NAME = 'tasks';
/* GET tasks listing. */

router.get('/', async (req, res, next) => {
  const db = require('../libs/mongodb').getDb();
  const collection = db.collection(COLLECTION_NAME);
  collection.find({}).toArray((error, tasks) => {
    res.json(tasks);
  });
});

router.get('/:id', function (req, res) {
  const db = require('../libs/mongodb').getDb();
  const collection = db.collection(COLLECTION_NAME);
  collection.find({ id: req.params.id }).next().then(task => {
    res.json(task);
  });
});

/* POST task. */
router.post('/', async (req, res, next) => {
  const db = require('../libs/mongodb').getDb();
  db.collection(COLLECTION_NAME).insertOne(req.body)
});

/* PUT (update) task. */
router.put('/:id', async (req, res, next) => {
  const db = require('../libs/mongodb').getDb();
  db.collection(COLLECTION_NAME).updateOne({ id: req.params.id }, { $set: req.body });
});

router.delete('/:id', function (req, res) {
  const db = require('../libs/mongodb').getDb();
  const collection = db.collection(COLLECTION_NAME);
  collection.deleteOne({ id: req.params.id }).then(task => {
    res.end();
  }).catch(err => {  
    console.log(err);
  });
})


module.exports = router;

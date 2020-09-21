const express = require('express');
const router = express.Router();

/* GET users listing. */

router.get('/', async (req, res, next) => {
  const db = require('../libs/mongodb').getDb();

  const collection = db.collection('users');
  collection.find({}).toArray((error, users) => {
    res.json(users);
  });

  router.get('/:id', function (req, res) {
    collection.find({id: req.params.id}).next().then(user => {
      console.log(user);
      res.json(user);
    })
    //res.send('id: ' + req.params.id);
  });
});


/* POST user. */
router.post('/', async (req, res, next) => {
  const db = require('../libs/mongodb').getDb();
  db.collection('users').insertOne(req.body)
});




module.exports = router;

const express = require('express');
const router = express.Router();

const UserService = require('../services/users');
/* GET users listing. */

router.get('/', async (req, res, next) => {
   
    const user_id = req.query.id;
    const searchObj = {};

    if (user_id) {
        searchObj.id = user_id;
    }
    
    let data = await UserService.GetUsers(searchObj);
    console.log("Data recieved");
    console.log(data);
 
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

router.delete('/:id', function (req, res) {
  const db = require('../libs/mongodb').getDb();
  const collection = db.collection('users');
  collection.deleteOne({ id: req.params.id }).then(user => {
    res.end();
  }).catch(err => {  
    console.log(err);
  });
})


module.exports = router;

const express = require('express');
const router = express.Router();
const UserService = require('../services/users');

router.get('/', async (req, res, next) => {
    const user_id = req.query.id;
    const searchObj = {};
    //#ASK_ALEX Should searchObj be here or in the service?
    if (user_id) {
        searchObj.id = user_id;
    }
    const data = await UserService.GetUsers(searchObj);
    res.json(data);
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  const data = await UserService.GetUser(id);
  res.json(data);
});


router.post('/', async (req, res, next) => {
  UserService.AddUser(req.body);
});

router.post('/:login', async (req, res, next) => {
  //#NOTES_FOR_ALEX:
  //this entire thing will ofcourse be moved into the services.
  //This is just a prototype to understand from you if it is okay and should I build upon it.
  //Also at the moment I only return true or false. If all is well I will proceed with the token.
  const db = require('../libs/mongodb').getDb();
  const collection = db.collection('users');
  const user_to_find = req.body;
  
  console.log("#############");
  collection.find({name: user_to_find.name}).next().then(user => {
    console.log("user found");
    if (user.password == user_to_find.password){
      console.log("passwords match");
      res.json(true);
    }
    else{
      console.log("passwords do not match");
      res.json(false);
    }
  });
});

router.put('/:id', async (req, res, next) => {
  UserService.UpdateUser(req.body);
});


router.delete('/:id', function (req, res) {
  UserService.DeleteUser(req.body);
})

module.exports = router;

const express = require('express');
const router = express.Router();
const UserService = require('../services/users');

router.get('/', async (req, res, next) => {
  const user_id = req.query.id;
  const searchObj = {};
  if (user_id) {
    searchObj.id = user_id;
  }
  if (UserService.VerifyToken(req.query.token)) {
    const data = await UserService.GetUsers(searchObj);
    res.json(data);
  }
  else {
    res.json("Invalid Token");
    return;
  }
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
  //#TODO - changed boolean to token
  //At the moment I only return true or false. If all is well I will proceed with the token.
  const data = await UserService.LoginUser(req.body.name, req.body.password);
  //console.log(data);
  res.json(data);

});

router.put('/:id', async (req, res, next) => {
  UserService.UpdateUser(req.body);
});


router.delete('/:id', function (req, res) {
  UserService.DeleteUser(req.body);
})

module.exports = router;

const express = require('express');
const router = express.Router();
const UserService = require('../services/users');

router.get('/', async (req, res, next) => {
  const user_id = req.query.id;
  const searchObj = {};
  if (user_id)
    searchObj.id = user_id;
  UserService.GetUsers(searchObj).then(data => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  });
});

router.get('/:id', async (req, res, next) => {
  const id = { id: req.params.id };
  UserService.GetUser(id).then(data => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  });
});

router.post('/', async (req, res, next) => {
  UserService.AddUser(req.body).then(data => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  });
});

router.put('/', async (req, res, next) => {
  const user = req.body;
  UserService.UpdateUser(user).then(data => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  });
});

router.delete('/:id', async (req, res, next) => {
  const user_id = req.params;
  UserService.DeleteUser(user_id).then(data => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  });
});

module.exports = router;

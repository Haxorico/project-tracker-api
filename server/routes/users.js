const express = require('express');
const router = express.Router();
const UserService = require('../services/users');

router.get('/', async (req, res, next) => {
    const searchObj = req.query;
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

router.put('/:id', async (req, res, next) => {
  UserService.UpdateUser(req.body);
});

router.delete('/:id', function (req, res) {
  UserService.DeleteUser(req.body);
})

module.exports = router;

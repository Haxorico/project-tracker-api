const express = require('express');
const tasks = require('../services/tasks');
const router = express.Router();
const TaskService = require('../services/tasks');

router.get('/', async (req, res, next) => {
  const searchObj = req.query;
  const data = await TaskService.GetTasks(searchObj);
  res.json(data);
});

router.get('/:id', async (req, res,next) => {
  const searchObj = req.params.id;
  const data = await TaskService.GetTask(searchObj);
  res.json(data);
});

router.post('/', async (req, res, next) => {
  TaskService.AddTask(req.body);
});

/* PUT (update) task. */
router.put('/:id', async (req, res, next) => {
  TaskService.UpdateTask(req.body);
});

router.delete('/:id', function (req, res) {
  TaskService.DeleteTask(req.body);
});

module.exports = router;

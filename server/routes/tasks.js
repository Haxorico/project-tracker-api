const express = require('express');
const router = express.Router();
const TaskService = require('../services/tasks');

router.get('/', async (req, res, next) => {
  const query = req.query
  const pid = query.project_id;
  const wid = query.worker_id;
  const rid = query.reporter_id;
  const searchObj = {};
  if (pid)
    searchObj.id = pid;
  if (wid)
    searchObj.worker_id = wid;
  if (rid)
    searchObj.reporter_id = rid;
  TaskService.GetTasks(searchObj).then(data => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  });
});

router.get('/:id', function (req, res) {
  const id = req.params.id;
  TaskService.GetTask(id).then(data => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  });
});

router.post('/', async (req, res, next) => {
  TaskService.AddTask(req.body).then(data => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  });
});

router.put('/:id', async (req, res, next) => {
  TaskService.UpdateTask(req.body).then(data => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  });
});

/* 
router.delete('/:id', function (req, res) {
    ProjectService.DeleteProject(req.body).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });;
});
*/

router.delete('/:id', function (req, res) {
  TaskService.DeleteTask(req.body).then(data => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  });
});


module.exports = router;

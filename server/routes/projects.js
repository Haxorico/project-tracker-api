const express = require('express');
const router = express.Router();
const ProjectService = require('../services/projects');

router.get('/', async (req, res, next) => {
    const searchObj = req.query;
    const data = await ProjectService.GetProjects(searchObj);
    res.json(data);
});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const data = await ProjectService.GetProject(id);
    res.json(data);
});

router.post('/', async (req, res, next) => {
    ProjectService.AddProject(req.body);
});

router.put('/:id', async (req, res, next) => {
    ProjectService.UpdateProject(req.body);
});

router.delete('/:id', function (req, res) {
    ProjectService.DeleteProject(req.body);
});

module.exports = router;

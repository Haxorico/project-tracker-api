const express = require('express');
const router = express.Router();
const ProjectService = require('../services/projects');

router.get('/', async (req, res, next) => {
    const project_id = req.query.id;
    const user_id = req.query.team_members_ids;
    const searchObj = {};
    if (project_id) {
        searchObj.id = project_id;
    }
    if (user_id) {
        searchObj.team_members_ids = parseInt(user_id);
    }
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

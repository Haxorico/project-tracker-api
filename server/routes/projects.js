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
    ProjectService.GetProjects(searchObj).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    ProjectService.GetProject(id).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

router.post('/', async (req, res, next) => {
    ProjectService.AddProject(req.body).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

router.put('/:id', async (req, res, next) => {
    ProjectService.UpdateProject(req.body).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

router.delete('/:id', function (req, res) {
    ProjectService.DeleteProject(req.body).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });

});

module.exports = router;

const express = require('express');
const router = express.Router();
const RegisterService = require('../services/register');

router.get('/', async (req, res, next) => {
    const register_id = req.query.id;
    const searchObj = {};
    if (register_id) {
        searchObj.id = register_id;
    }
    RegisterService.GetRegisters(searchObj).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

router.get('/:id', async (req, res, next) => {
    const id = { id: req.params.id };
    RegisterService.GetRegister(id).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

router.post('/', async (req, res, next) => {
    RegisterService.AddRegister(req.body).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

router.put('/:id', async (req, res, next) => {
    RegisterService.UpdateRegister(req.body).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

router.delete('/:id', function (req, res) {
    RegisterService.DeleteRegister(req.body).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });

});

module.exports = router;

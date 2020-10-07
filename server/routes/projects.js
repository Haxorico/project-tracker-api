const express = require('express');
const router = express.Router();
const COLLECTION_NAME = 'projects';
/* GET tasks listing. */

router.get('/', async (req, res, next) => {
    const db = require('../libs/mongodb').getDb();
    const collection = db.collection(COLLECTION_NAME);
    const user_id = req.query.team_members_ids;

    const searchObj = {};

    if (user_id) {
        searchObj.team_members_ids = parseInt(user_id);
    }

    collection.find(searchObj).toArray((error, projects) => {
        res.json(projects);
    });

});

router.get('/:id', function (req, res) {
    const db = require('../libs/mongodb').getDb();
    const collection = db.collection(COLLECTION_NAME);
    collection.find({ id: req.params.id }).next().then(project => {
        res.json(project);
    });
});

/* POST task. */
router.post('/', async (req, res, next) => {
    const db = require('../libs/mongodb').getDb();
    db.collection(COLLECTION_NAME).insertOne(req.body)
});

/* PUT (update) task. */
router.put('/:id', async (req, res, next) => {
    const db = require('../libs/mongodb').getDb();
    db.collection(COLLECTION_NAME).updateOne({ id: req.params.id }, { $set: req.body });
});

router.delete('/:id', function (req, res) {
    const db = require('../libs/mongodb').getDb();
    const collection = db.collection(COLLECTION_NAME);
    collection.deleteOne({ id: req.params.id }).then(project => {
        res.end();
    }).catch(err => {
        console.log(err);
    });
})


module.exports = router;

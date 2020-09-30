const express = require('express');
const router = express.Router();
const COLLECTION_NAME = 'projects';
/* GET tasks listing. */

router.get('/', async (req, res, next) => {
    const db = require('../libs/mongodb').getDb();
    const collection = db.collection(COLLECTION_NAME);
    const query = req.query
    const user_id = query.team_members_ids;
    if (user_id) {
        console.log("query team_members_ids found: " + user_id);
        const tempArray = [];
        await collection.find().forEach(project => {
            //#ASK_ALEX:
            /* currently the problem is that I need to scan 2 arrays.
            projects is an object array and I need to look in each object if a user id exists inside its users_ids array.
            should I be using lodash? should I be using the built in .find function?
            I checked and the query works just gotta understand HOW to proporly scan the arrays */
            project.team_members_ids.forEach(arrUser => {
                console.log("current user " + arrUser);
                if (arrUser == user_id) {
                    tempArray.push(project);
                    //break; cant break in js foreach :S
                }
            })
        });
        res.json(tempArray);
    }
    else {
        collection.find({}).toArray((error, projects) => {
            res.json(projects);
        });
    }

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

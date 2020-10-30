const ent_name = 'tasks';

function GetTasks(query_paramters) {
    //#TODO Add more and use the actual query paramters.
    const collection = require('../libs/mongodb').getCollection(ent_name);
    const pid = query_paramters.project_id;
    const wid = query_paramters.worker_id;
    const rid = query_paramters.reporter_id;
    const user_id = query_paramters.user_id;
    const searchObj = {};

    return new Promise((resolve, reject) => {
        if (user_id) {
            searchObj.team_members_ids = puser_id;
            collection.find({ $or: [{ worker_id: user_id }, { reporter_id: user_id }] }).toArray((error, tasks) => {
                resolve(tasks);
            });
        }
        else {
            collection.find({}).toArray((error, tasks) => {
                resolve(tasks);
            });
        }
    });
}

async function GetTask(query_paramters) {
    const collection = require('../libs/mongodb').getCollection(ent_name);
    return new Promise((resolve, reject) => {
        collection.find(query_paramters).next().then(task => {
            resolve(task);
        });
    });
}

function AddTask(task_to_add) {
    const collection = require('../libs/mongodb').getCollection(ent_name);
    collection.insertOne(task_to_add);
}

function UpdateTask(task_to_update) {
    const collection = require('../libs/mongodb').getCollection(ent_name);
    collection.updateOne({ id: task_to_update.id }, task_to_update);
}

function DeleteTask(task_to_delete) {
    const collection = require('../libs/mongodb').getCollection(ent_name);
    collection.deleteOne({ id: task_to_delete.id });
}

module.exports = { GetTasks, GetTask, AddTask, UpdateTask, DeleteTask }

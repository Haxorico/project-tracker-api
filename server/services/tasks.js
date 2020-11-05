const ent_name = 'tasks';

function GetTasks(query_paramters) {
    return new Promise((resolve, reject) => {
        const collection = require('../libs/mongodb').getCollection(ent_name);
        collection.find(query_paramters).toArray((error, data) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(data);
        });
    });
}

function GetTask(query_paramters) {
    return new Promise((resolve, reject) => {
        const collection = require('../libs/mongodb').getCollection(ent_name);
        collection.find(query_paramters).next().then(data => {
            if (data == null) {
                reject("Task not found");
                return;
            }
            resolve(data);
        }).catch(err => {
            reject(err);

        });
    });
}

function AddTask(task_to_add) {
    return new Promise((resolve, reject) => {
        const collection = require('../libs/mongodb').getCollection(ent_name);
        collection.insertOne(task_to_add).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err);
        });
    });
}

function UpdateTask(task_to_update) {
    return new Promise((resolve, reject) => {
        const collection = require('../libs/mongodb').getCollection(ent_name);
        collection.updateOne({ id: task_to_update.id }, { $set: task_to_update }).then(data => {
            if (data.matchedCount < 1) {
                reject(task_to_update.id + " <- This ID was NOT Found");
                return;
            }
            resolve();
        }).catch(err => {
            reject(err);
        });
    });
}

function DeleteTask(task_to_delete) {
    return new Promise((resolve, reject) => {
        const collection = require('../libs/mongodb').getCollection(ent_name);
        collection.deleteOne({ id: task_to_delete.id }).then(data => {
            if (data.deletedCount < 1) {
                reject(task_to_delete.id + " <- This ID was NOT Found");
                return;
            }
            resolve({});
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = { GetTasks, GetTask, AddTask, UpdateTask, DeleteTask }

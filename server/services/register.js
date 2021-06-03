const ent_name = 'registers';

function GetRegisters(query_paramters) {
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

function GetRegister(query_paramters) {
    console.log("query_paramters => ", query_paramters);
    return new Promise((resolve, reject) => {
        const collection = require('../libs/mongodb').getCollection(ent_name);
        collection.find(query_paramters).next().then(data => {
            console.log(data);
            if (data == null) {
                reject("Register not found");
                return;
            }
            resolve(data);
        }).catch(err => {
            reject(err);

        });
    });
}

function AddRegister(register_to_add) {
    return new Promise((resolve, reject) => {
        const collection = require('../libs/mongodb').getCollection(ent_name);
        collection.insertOne(register_to_add).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err);
        });
    });
}

function UpdateRegister(register_to_update) {
    return new Promise((resolve, reject) => {
        const collection = require('../libs/mongodb').getCollection(ent_name);
        collection.updateOne({ id: register_to_update.id }, { $set: register_to_update }).then(data => {
            if (data.matchedCount < 1) {
                reject(register_to_update.id + " <- This ID was NOT Found");
                return;
            }
            resolve();
        }).catch(err => {
            reject(err);
        });
    });
}

function DeleteRegister(register_to_delete) {
    return new Promise((resolve, reject) => {
        const collection = require('../libs/mongodb').getCollection(ent_name);
        collection.deleteOne({ id: register_to_delete.id }).then(data => {
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

module.exports = { GetRegisters, GetRegister, AddRegister, UpdateRegister, DeleteRegister }

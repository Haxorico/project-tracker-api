const ent_name = 'projects';

function GetProjects(query_paramters) {
    return new Promise((resolve, reject) => {
        const collection = require('../libs/mongodb').getCollection(ent_name);
        collection.find(query_paramters).toArray((error, projects) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(projects);
        });
    });
}

function GetProject(query_paramters) {
    return new Promise((resolve, reject) => {
        const collection = require('../libs/mongodb').getCollection(ent_name);
        collection.find(query_paramters).next().then(project => {
            if (project == null) {
                reject("Project not found");
                return;
            }
            resolve(project);
        }).catch(err => {
            reject(err);
        });
    });
}

function AddProject(project_to_add) {
    return new Promise((resolve, reject) => {
        const collection = require('../libs/mongodb').getCollection(ent_name);
        collection.insertOne(project_to_add).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err);
        });
    });
}

function UpdateProject(project_to_update) {
    return new Promise((resolve, reject) => {
        const collection = require('../libs/mongodb').getCollection(ent_name);
        collection.updateOne({ id: project_to_update.id }, { $set: project_to_update }).then(data => {
            if (data.matchedCount < 1) {
                reject(project_to_update.id + " <- This ID was NOT Found");
                return;
            }
            resolve();
        }).catch(err => {
            reject(err);
        });
    });
}

function DeleteProject(project_to_delete) {
    return new Promise((resolve, reject) => {
        const collection = require('../libs/mongodb').getCollection(ent_name);
        collection.deleteOne({ id: project_to_delete.id }).then(data => {
            if (data.deletedCount < 1) {
                reject(project_to_delete.id + " <- This ID was NOT Found");
                return;
            }
            resolve({});
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = { GetProjects, GetProject, AddProject, UpdateProject, DeleteProject }

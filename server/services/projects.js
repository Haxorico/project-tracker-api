const ent_name = 'projects';

function GetProjects(query_paramters) {
    const collection = require('../libs/mongodb').getCollection(ent_name);
    return new Promise((resolve, reject) => {
        collection.find(query_paramters).toArray((error, projects) => {
            resolve(projects);
        });
    });
}

async function GetProject(query_paramters) {
    const collection = require('../libs/mongodb').getCollection(ent_name);
    return new Promise((resolve, reject) => {
        collection.find(query_paramters).next().then(project => {
            resolve(project);
        });
    });
}

function AddProject(project_to_add) {
    const collection = require('../libs/mongodb').getCollection(ent_name);
    collection.insertOne(project_to_add);
}

function UpdateProject(project_to_update) {
    const collection = require('../libs/mongodb').getCollection(ent_name);
    collection.updateOne({ id: project_to_update.id }, project_to_update);
}

function DeleteProject(project_to_delete) {
    const collection = require('../libs/mongodb').getCollection(ent_name);
    collection.deleteOne({ id: project_to_delete.id });
}

module.exports = { GetProjects, GetProject, AddProject, UpdateProject, DeleteProject }

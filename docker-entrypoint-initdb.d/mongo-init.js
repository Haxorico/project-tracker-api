print('Start #################################################################');

db = db.getSiblingDB('project-tracker');
db.createUser(
  {
    user: 'pt',
    pwd: 'Google1234',
    roles: [{ role: 'readWrite', db: 'project-tracker' }],
  },
);

db.createCollection('users');

print('End #################################################################');

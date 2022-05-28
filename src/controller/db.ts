const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({}).write();

const get = async (key) => {
  return db.get(key).value();
};

const set = async (key, value) => {
  db.set(key, value).write();
};

const exists = async (key) => {
  return db.has(key).value();
};

export { get, set, exists };

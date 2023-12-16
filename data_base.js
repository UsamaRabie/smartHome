//database code for the app
/*
const mongoose = require('mongoose');
const dbConnectionStr = 'mongodb://localhost:27017/iot_motor';
mongoose.connect(dbConnectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
const state = new mongoose.Schema({
  value: Number,
});
const State = mongoose.model('State', state);
module.exports = { State};*/

/*
const { MongoClient } = require('./node_modules/mongodb');

const dbConnectionStr = 'mongodb://localhost:27017/iot_motor';

async function connectToMongoDB() {
  try {
    const client = await MongoClient.connect(dbConnectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    return client;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Define the state schema
const State = {
  value: Number,
};


// Create the state collection

async function createStateCollection(client) {
  try {
    const db = client.db();
    const stateCollection = await db.createCollection('state', State);

    await stateCollection.createIndex({ value: 0 }, { unique: true });
    console.log('State collection created');
    return stateCollection;
  } catch (error) {
    console.error('Error creating state collection:', error);
    throw error;
  }
}

createStateCollection(connectToMongoDB());

module.exports = { State};*/





const { MongoClient, ObjectId } = require('./node_modules/mongodb');

const mongoURI = 'mongodb://localhost:27017';
const dbName = 'motorDB';

async function connectToDatabase() {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB\n');
    return client.db(dbName);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}

async function insertState(db, value) {
  const ledCollection = db.collection('state');
  const newDocument = { _id: new ObjectId(), value };
  try {
    await ledCollection.insertOne(newDocument);
    console.log(`Status inserted for ID ${ newDocument._id } with value ${ value } \n`);
  } catch (err) {
    console.error('Error inserting status:', err);
    throw err;
  }
}

module.exports = { connectToDatabase, insertState };


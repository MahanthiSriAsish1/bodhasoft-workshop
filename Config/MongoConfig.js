const { MongoClient } = require("mongodb");
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function connectClient() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

const listDatabases = async () => {
  const databaseList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databaseList.databases.forEach((db) => console.log(` - ${db.name}`));
};

const insertDoc = async (dbName, collectionName, doc) => {
  try {
    const collection = client.db(dbName).collection(collectionName);

    // Check if document already exists based on name, college, phone, and email
    const existingDoc = await collection.findOne({
      name: doc.name,
      college: doc.college,
      phone: doc.phone,
      email: doc.email,
    });

    if (existingDoc) {
      return "Document already exists";
    }

    const result = await collection.insertOne(doc);
    return `New document inserted with the following id: ${result.insertedId}`;
  } catch (error) {
    console.error("Error inserting document:", error);
    throw error;
  }
};

const findDocs = async (dbName, collectionName) => {
  const collection = client.db(dbName).collection(collectionName);
  const results = await collection.find({}).toArray();
  console.log("Found documents:", results);
  return results;
};

const updateDoc = async (dbName, collectionName, filter, update) => {
  const result = await client
    .db(dbName)
    .collection(collectionName)
    .updateOne(filter, { $set: update });
  console.log(
    `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
  );
};

const deleteDoc = async (dbName, collectionName, filter) => {
  const result = await client
    .db(dbName)
    .collection(collectionName)
    .deleteOne(filter);
  console.log(`Deleted ${result.deletedCount} document(s)`);
};

module.exports = {
  client,
  connectClient,
  listDatabases,
  insertDoc,
  findDocs,
  updateDoc,
  deleteDoc,
};

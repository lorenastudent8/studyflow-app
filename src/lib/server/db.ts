import { MongoClient } from 'mongodb';
import { MONGODB_URI, MONGODB_DB } from '$env/static/private';

const client = new MongoClient(MONGODB_URI);

export async function getDb() {
  await client.connect();
  return client.db(MONGODB_DB);
}
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { mySchema } from './model/schema';

// import Post from './model/Post' // ⬅️ You'll import your Models here
import List from './model/List';

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema: mySchema,
});

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [
    // Post, // ⬅️ You'll add Models to Watermelon here
    List,
  ],
  actionsEnabled: true,
});

export default database;

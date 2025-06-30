import { sql } from './db.js'

// sql`drop table if exists videos;`.then(() => {
//     console.log('Table "videos" dropped successfully.');
// });     



sql`
  CREATE TABLE videos (
    id          TEXT,
    title       TEXT,
    description TEXT,
    duration    INTEGER
  );
`.then(() => {
  console.log('Table "videos" created successfully.');
}).catch((error) => {
  console.error('Error creating table "videos":', error);
}).finally(() => {
  sql.end();
}   );              
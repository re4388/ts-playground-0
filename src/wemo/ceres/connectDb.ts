import express from 'express';
import { createPool, sql } from 'slonik'

const main = async () => {
  const pool = await createPool('postgres://qat:1qaz@WSX@127.0.0.1:9432/ceres-qat');

  const app = express();
  const port = 3002;

  app.get('/', (req, res) => {
    res.send('Hello, World!')
  });


  app.get('/allTables', async (req, res) => {
    const queryResult = await pool.any(sql.unsafe`SELECT tablename
FROM pg_catalog.pg_tables
WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';`);

    res.json(queryResult);
  });

  // app.get('/test1', async (req, res) => {
  //   const queryResult = await pool.any(sql.unsafe`SELECT * FROM ceres-qat.Wallet WHERE id =1;`);
  //
  //   res.json(queryResult);
  // });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
};

void main();

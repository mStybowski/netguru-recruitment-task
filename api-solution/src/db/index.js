import pg from 'pg';

const pool = new pg.Pool();

const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.log('error in query', { text });
    throw error;
  }
};

const createTableText = `
    CREATE TABLE IF NOT EXISTS "movies" (
      id SERIAL,
	    title VARCHAR (255),
	    released DATE,
	    genre VARCHAR(255),
	    director VARCHAR (255),
      userId VARCHAR (255),
      created_at DATE DEFAULT CURRENT_DATE,
	    PRIMARY KEY ("id")
    );`;

const createMoviesTable = () => {
  pool.query(createTableText, (err, res) => {
    if (err) {
      throw err;
    } else {
      console.dir(res);
    }
  });
};

export { query, createMoviesTable };

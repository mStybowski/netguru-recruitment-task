import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mountRoutes from './routes/index.js';
import { createMoviesTable } from './db/index.js';

const { PORT } = process.env;

const server = express();
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

mountRoutes(server);

function startServer() {
  return new Promise((resolve) =>
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
      createMoviesTable();
      resolve();
    })
  );
}

function stopServer() {
  return new Promise((resolve) =>
    server.close(() => {
      console.log('Server stopped');
      resolve();
    })
  );
}

export { server, startServer, stopServer };

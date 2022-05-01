import { respondWithJSON } from '../lib/index.js';

const notFound = async (req, res) => {
  try {
    respondWithJSON(res, 404, 'Route not found');
  } catch (error) {
    console.error('NotFound error', error);
    respondWithJSON(res, 500, 'There was an error at NotFound controller.');
  }
};

export { notFound };

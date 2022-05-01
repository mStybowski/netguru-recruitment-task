import { respondWithJSON } from '../lib/index.js';

const renderIndex = async (req, res) => {
  try {
    res.status(200).send('IndexPage');
  } catch (error) {
    console.error('renderIndex', error);
    respondWithJSON(res, 500, 'There was an error at renderIndex controller.');
  }
};

const renderAPIDocumentation = async (req, res) => {
  try {
    res.status(200).send('API Documentation');
  } catch (error) {
    console.error('renderAPIDocumentation', error);
    respondWithJSON(res, 500, 'There was an error at renderAPIDocumentation controller.');
  }
};

const notFound = async (req, res) => {
  try {
    respondWithJSON(res, 404, 'Route not found');
  } catch (error) {
    console.error('renderAPIDocumentation', error);
    respondWithJSON(res, 500, 'There was an error at renderAPIDocumentation controller.');
  }
};

export { renderIndex, renderAPIDocumentation, notFound };

import movies from './movies.routes.js';
import index from './index.routes.js';

export default (app) => {
  app.use('/movies', movies);
  app.use('/', index);
};

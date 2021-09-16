const showBooks = require('./books');
const showReviews = require('./reviews');

const constructorMethod = (app) => {
  app.use('/books', showBooks);
  app.use('/reviews', showReviews);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;
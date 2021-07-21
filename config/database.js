const mongoose = require('mongoose');

/*
 * function to connect mongoose database
 * @returns connection
 */
function dbconnect() {
  // eslint-disable-next-line no-unused-expressions
  mongoose.promise;
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  return mongoose.connection
    // eslint-disable-next-line no-console
    .once('open', () => console.log('Mongo database Connected'))
    .on('error', (error) => {
      // eslint-disable-next-line no-console
      console.log('Eroor found', error);
    });
}

module.exports = dbconnect;

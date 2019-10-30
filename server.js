const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) console.log(`Error: conectting to database. ${err}`);
  else app.listen(config.port, console.log(`Api running in port ${config.port}`));
});

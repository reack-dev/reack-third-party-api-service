const mongoose = require('mongoose');
const config = require('../utils/config');
const logger = require('../utils/logger');

mongoose.set('strictQuery', true);

logger.info(`connecting to ${config.MONGODB_URI}`);

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('connected to MongoDB'))
  .catch((err) => logger.info('error connecting to MongoDB: ', err.message));

const requestSchema = new mongoose.Schema({
  header: {
    type: Object,
    minLength: 1,
  },

  raw: {
    type: String,
  },
});

requestSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Request', requestSchema);

const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');

app.listen(config.PORT, () => {
  logger.info(`3rd-party API Server is listening on port ${config.PORT}...`)
});
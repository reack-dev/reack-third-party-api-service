const app = require('./app');
const config = require('./utils/config');

app.listen(config.PORT, () => {
  console.log(`3rd-party API Server is listening on port ${config.PORT}...`)
});
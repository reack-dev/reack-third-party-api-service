require('dotenv').config()

const { PORT, MONGODB_URI, DATABASE } = process.env;

module.exports = { PORT, MONGODB_URI, DATABASE };


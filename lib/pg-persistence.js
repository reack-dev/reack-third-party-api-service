const { dbQuery } = require("./db-query");
const bcrypt = require("bcrypt");

module.exports = class PgPersistence {
  // constructor(sessionID) {
  // 	this.sessionID = sessionID; //
  // }

  async testQuery1() {
    const SELECT = 'SELECT * FROM url';
    let result = await dbQuery(SELECT);
    console.log(result);
    return result;
  }

  async getURLs() {
    const SELECT = 'SELECT * FROM urls WHERE session_id = $1';

    let result = await dbQuery(SELECT, this.sessionID);

    return result.rows;
  }

  async getRequestsForUrl(urlId) {
    const SELECT = 'SELECT * FROM requests WHERE url_id = $1';

    let result = await dbQuery(SELECT, urlId);

    return result.rows;
  }

  // async acceptUserCredentials(username, password) {
  // 	const SELECT = 'SELECT password FROM users WHERE username = $1';

  // 	let result = await dbQuery(SELECT, username);

  // 	if (result.rowCount === 0) return false;

  // 	return bcrypt.compare(password, result.rows[0].password);
  // }

  // REPLACE WITH ACTUAL QUERIES
  async sortedPlants(plantListId, limit = 10, offset = 0) {
  	const PLONTS = 'SELECT * FROM plant_info WHERE plantlist_id = $1 ORDER BY "date" DESC OFFSET $2 LIMIT $3';

  	let result = await dbQuery(PLONTS, plantListId, offset, limit);

  	return result.rows;
  }

  async sortedPlantLists(limit = 10, offset = 0) {
  	const SELECT = 'SELECT * FROM plantlists WHERE username = $1 ORDER BY name ASC OFFSET $2 LIMIT $3';

  	let result = await dbQuery(SELECT, this.username, offset, limit);

  	return result.rows;
  }

}
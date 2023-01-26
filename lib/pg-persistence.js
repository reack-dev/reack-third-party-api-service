const { dbQuery } = require("./db-query");

module.exports = class PgPersistence {
  // constructor(sessionID) {
  // 	this.sessionID = sessionID; //
  // }

  async testQuery1() {
    const SELECT = 'SELECT * FROM request';
    let result = await dbQuery(SELECT);
    console.log(result.rows);
    return result.rows;
  }

  async getUrlIdForUrl(url) {
    const SELECT = 'SELECT id FROM url WHERE random_url_string = $1';

    let result = await dbQuery(SELECT, url);

    return result.rows[0];
  }

  async getRequestsForUrlId(urlId) {
    const SELECT = 'SELECT * FROM request WHERE url_id = $1';

    let result = await dbQuery(SELECT, urlId);

    return result.rows;
  }

  async insertRequestForUrl(noSqlId, urlId, method, path, host) {
    const INSERT = 'INSERT INTO request (no_sql_id, url_id, method, path, host) VALUES ($1, $2, $3, $4, $5)';

    let result = await dbQuery(INSERT, noSqlId, urlId, method, path, host);

    return result.rowCount > 0;
  }

}

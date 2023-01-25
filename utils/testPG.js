const PG = require('../lib/pg-persistence');

(async () => {
  const PeGe = new PG();
  let response = await PeGe.testQuery1();

  console.log(response.rows);
})();
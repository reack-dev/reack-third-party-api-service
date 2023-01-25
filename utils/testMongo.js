const RequestModel = require('../models/request');

const testSave = () => {
  const rawRequest = new RequestModel({
    request: "hello, test2"
  });

  rawRequest.save()
};

module.exports = testSave;
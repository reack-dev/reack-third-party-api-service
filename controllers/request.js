const requestRouter = require('express').Router();
const RequestModel = require('../models/request');

requestRouter.post('/', (req, res, next) => {
  const rawRequest = new RequestModel({
    header: req.headers,
    raw: req.rawHeaders
  });

  rawRequest.save()
    .then((saved) => {
      res.json(saved);
    })
    .catch((err) => next(err));
})

module.exports = requestRouter;
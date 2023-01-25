const requestRouter = require('express').Router();
const RequestModel = require('../models/request');

requestRouter.post('/', (req, res, next) => {
  const rawRequest = new RequestModel({
    method: req.method,
    host: req.hostname,
    path: req.path,
    headers: req.headers,
    body: req.body,
  });

  rawRequest.save()
    .then((saved) => {
      res.json(saved); // debugging purposes, can be removed
    })
    .catch((err) => next(err));
})

module.exports = requestRouter;
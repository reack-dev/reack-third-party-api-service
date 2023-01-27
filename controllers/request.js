const requestRouter = require('express').Router();
const RequestModel = require('../models/request');
const PG = require('../lib/pg-persistence');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const SQL = new PG(); 

requestRouter.post('/', async (req, res, next) => {
  console.log(req.hostname);
  const randomUrl = req.hostname.split(".")[0]; // SWITCH BACK if route path adjusts
  // const randomUrl = req.params.url;
  const rawRequest = new RequestModel({
    method: req.method,
    randomURL: randomUrl,
    path: req.path,
    headers: req.headers,
    body: req.body,
  });

  const savedRequest = await rawRequest.save();
  // SEND REQUEST TO APP 1 - NEW REQUEST HAS BEEN RECEIVED
  console.log(savedRequest);

  const response = await fetch('https://kush.chris.connor.maxamoretti.com/newRequest', { 
    method: 'post',
    body: JSON.stringify(savedRequest),
    headers: {'Content-Type': 'application/json'}
  });

  const data = await response.json();

  console.log("hhhhh", data);
  
  const noSqlId = rawRequest.id;
  const { id: urlId } = await SQL.getUrlIdForUrl(randomUrl);
  
  await SQL.insertRequestForUrl(noSqlId, urlId, req.method, req.path, req.hostname);
  res.json('thanks');
});

module.exports = requestRouter;
const requestRouter = require('express').Router();
const RequestModel = require('../models/request');
const PG = require('../lib/pg-persistence');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const SQL = new PG(); // needs to be same database as URLs from app1/generate Random

requestRouter.get('/', (req, res) => {
  console.log('hit');
  res.json('yesesesess');
});

requestRouter.post('/', async (req, res, next) => {
  const randomUrl = req.hostname.split(".")[0];  
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

  const response = await fetch('https://796d-64-137-154-107.ngrok.io/newRequest', { // TODO change with localhost:3000 (wherever app1 is listening)
    method: 'post',
    body: JSON.stringify(savedRequest),
    headers: {'Content-Type': 'application/json'}
  });

  const data = await response.json();

  console.log("hhhhh", data);
  
  const noSqlId = rawRequest.id;
  const urlId = await SQL.getUrlIdForUrl(randomUrl);
  
  await SQL.insertRequestForUrl(noSqlId, urlId, req.method, req.path, req.hostname);
  
});

module.exports = requestRouter;
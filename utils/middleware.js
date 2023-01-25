const errorHandler = (error, request, response, next) => {
  console.log(error);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'invalid id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).end();
};

module.exports = { errorHandler, unknownEndpoint };
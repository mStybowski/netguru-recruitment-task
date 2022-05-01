const dateFromString = (dateString) => {
  const dateInMiliseconds = Date.parse(dateString);
  return !isNaN(dateInMiliseconds) ? new Date(dateInMiliseconds) : null;
};

const respondWithJSON = (res, statusCode, message) => {
  res.status(statusCode).json({
    statusCode,
    message,
  });
};

const adder = (a, b) => a + b;

export { dateFromString, respondWithJSON, adder };

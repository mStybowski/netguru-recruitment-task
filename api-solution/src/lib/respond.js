const respondWithJSON = (res, statusCode, message) => {
  res.status(statusCode).json({
    statusCode,
    message,
  });
};

export { respondWithJSON };

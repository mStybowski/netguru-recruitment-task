const dateFromString = (dateString) => {
  const dateInMiliseconds = Date.parse(dateString);
  return !isNaN(dateInMiliseconds) ? new Date(dateInMiliseconds) : null;
};

export { dateFromString };

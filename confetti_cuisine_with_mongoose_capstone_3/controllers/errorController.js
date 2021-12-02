const httpStatus = require("http-status-codes");

exports.pageNotFoundError = (req, res) => {
  const errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);
  res.render("error");
};

exports.internalServerError = (error, req, res, next) => {
  const errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.error(`ERROR occurred: ${error.stack}`);
  res.status(errorCode);
  res.sendFile(`./public/${errorCode}.html`, { root: "./" });
};

// import ErrorModel from "../model/ErrorModel";
import ErrorModel from "../model/ErrorModel.js";
//Make the error format more neat.
function createNewErrorObj(err) {
  var statusCode = err.status;
  if (!statusCode) {
    statusCode = 500;
  }
  if (!err.message) {
    err.message = "Someting went wrong!";
  }
  const newErr = new ErrorModel(err.message, statusCode, "error");
  return newErr;
}
//Catch error and send them.
export function errhandlerGeneral(err, req, res, next) {
  console.log(err);
  // res.status(500).json({ err: err.message });
  const errHandler = createNewErrorObj(err);
  res.status(errHandler.obj.status_code).json(errHandler.obj);
}
//A simple version fo err which can't modify the status code.
export function simpleErrOutput(err, req, res, next) {
  err.status = 500;
  res
    .status(err.status)
    .json({ message: err.message, "status code": err.status, type: "err" });
}

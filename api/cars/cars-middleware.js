const Cars = require("./cars-model");
const db = require("../../data/db-config");
const vinValidator = require("vin-validator");

const checkCarId = (req, res, next) => {
  Cars.getById(req.params.id)
    .then((car) => {
      if (!car) {
        next({
          status: 404,
          message: `car with id ${req.params.id} is not found`,
        });
      } else {
        req.car = car;
        next();
      }
    })
    .catch(next);
};

const checkCarPayload = (req, res, next) => {
  if (!req.body.vin) {
    next({ status: 400, message: `vin is missing` });
  } else if (!req.body.make) {
    next({ status: 400, message: `make is missing` });
  } else if (!req.body.model) {
    next({ status: 400, message: `model is missing` });
  } else if (!req.body.mileage) {
    next({ status: 400, message: `mileage is missing` });
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  const isValidVin = vinValidator.validate(req.body.vin);
  if (!isValidVin) {
    next({ status: 400, message: `vin ${req.body.vin} is invalid` });
  } else {
    next();
  }
};

const checkVinNumberUnique = (req, res, next) => {
  db("cars")
    .where("vin", req.body.vin)
    .first()
    .then((exists) => {
      if (exists) {
        next({ status: 400, message: `vin ${req.body.vin} already exists` });
      }
    })
    .catch(next);
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};

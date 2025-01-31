const db = require("../../data/db-config");

const getAll = () => {
  return db("cars");
};

const getById = (id) => {
  return db("cars").where({ id }).first();
};

const getByVin = (vin) => {
  return db("cars").where("vin", vin).first();
};

const create = (newCar) => {
  return db("cars")
    .insert(newCar)
    .then(([id]) => {
      return getById(id);
    });
};

module.exports = {
  getAll,
  getById,
  create,
  getByVin,
};

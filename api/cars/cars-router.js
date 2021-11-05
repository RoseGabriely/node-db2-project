const express = require("express");
const router = express.Router();
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");
const Cars = require("./cars-model");

router.get("/", (req, res, next) => {
  Cars.getAll()
    .then((cars) => {
      res.json(cars);
    })
    .catch(next);
});

router.get("/:id", checkCarId, (req, res, next) => {
  Cars.getById(req.params.id)
    .then((car) => {
      res.json(car);
    })
    .catch(next);
});

router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {
    // try {
    //   const car = await Cars.create(req.body);
    //   res.json(car);
    // } catch (err) {
    //   next(err);
    // }
    Cars.create(req.body)
      .then((newCar) => {
        res.json(newCar);
      })
      .catch(next);
  }
);

module.exports = router;

// STRETCH
const cars = [
  {
    vin: "JH4KA3160LC017215",
    make: "toyota",
    model: "prius",
    mileage: 100001,
    title: "clean",
    transmission: "manual",
  },
  {
    vin: "JH4KA4650LC000937",
    make: "toyota",
    model: "prius",
    mileage: 100001,
    title: "clean",
  },
  {
    vin: "1J4FA29P4YP728937",
    make: "toyota",
    model: "prius",
    mileage: 100001,
    transmission: "manual",
  },
];

// exports.seed = function(knex) {
//     return knex('cars')
//     .truncate().then(() => {
//         return knex('cars').insert(cars)
//     })
// }

exports.seed = async function (knex) {
  await knex("cars").truncate();
  await knex("cars").insert(cars);
};

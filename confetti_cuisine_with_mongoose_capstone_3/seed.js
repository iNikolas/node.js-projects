const mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber");

mongoose.connect("mongodb://localhost:27017/confetti_cuisine", (e) => {
  if (!e)
    console.log(
      "Seed's connection to MongoDB using Mongoose has been successfully established"
    );
});

const contacts = [
  {
    name: "Jon Wexler",
    email: "jon@jonwexler.com",
    zipCode: 10016,
  },
  {
    name: "Chef Eggplant",
    email: "eggplant@recipeapp.com",
    zipCode: 20331,
  },
  {
    name: "Professor Souffle",
    email: "souffle@recipeapp.com",
    zipCode: 19103,
  },
  {
    name: "Nikolaj Lebed",
    email: "realkolos1@gmail.com",
    zipCode: 49068,
  },
];

Subscriber.deleteMany()
  .then(() => console.log("Subscriber data is empty!"))
  .catch((e) => console.log("Something went wrong. Can't clear the database!"));

const commands = [];

contacts.forEach((contact) => {
  commands.push(
    Subscriber.create({
      name: contact.name,
      email: contact.email,
    })
  );
});

Promise.all(commands)
  .then((response) => {
    console.log(JSON.stringify(response, null, 2));
    mongoose.connection.close(() =>
      console.log(
        "Seed's connection to MongoDB using Mongoose has been successfully terminated!"
      )
    );
  })
  .catch((error) => console.log(`ERROR: ${error}`));

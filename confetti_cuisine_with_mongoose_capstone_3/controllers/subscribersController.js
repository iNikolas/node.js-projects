const Subscriber = require("../models/subscriber");

exports.getAllSubscribers = (req, res) => {
  Subscriber.find()
    .then((subscribers) => {
      res.render("subscribers", { subscribers });
    })
    .catch((e) => {
      console.log(e.message);
      return [];
    });
};

exports.getSubscriptionPage = (req, res) => {
  res.render("contact");
};

exports.saveSubscriber = (req, res) => {
  Subscriber.create({
    name: req.body.name,
    email: req.body.email,
    zipCode: req.body.zipCode,
  })
    .then(() => res.render("thanks"))
    .catch((e) => res.send(e));
};

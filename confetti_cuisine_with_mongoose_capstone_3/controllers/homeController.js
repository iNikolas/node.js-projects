const offeredCourses = [
  { title: "Event Driven Cakes", cost: 50 },
  { title: "Asynchronous Artichoke", cost: 25 },
  { title: "Object Oriented Orange Juice", cost: 10 },
];

exports.showCourses = (req, res) => {
  res.render("courses", { offeredCourses });
};

exports.postedSignUpForm = (req, res) => {
  res.render("thanks");
};
exports.showHomePage = (req, res) => {
  res.render("index");
};

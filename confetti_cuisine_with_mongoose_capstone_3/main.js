const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  subscribersController = require("./controllers/subscribersController");

mongoose.connect("mongodb://localhost:27017/confetti_cuisine", (e) => {
  if (!e)
    console.log(
      "Connection to the database has been successfully established!"
    );
});

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", homeController.showHomePage);
app.get("/courses", homeController.showCourses);
app.get("/contact", subscribersController.getSubscriptionPage);
app.get("/subscribers", subscribersController.getAllSubscribers);
app.post("/contact", homeController.postedSignUpForm);
app.post("/subscribe", subscribersController.saveSubscriber);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(
  app.get("port"),
  () =>
    `Server has been started and listening at the port number: ${app.get(
      "port"
    )}`
);

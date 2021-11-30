const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", homeController.showHomePage);
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(
  app.get("port"),
  () =>
    `Server has been started and listening at the port number: ${app.get(
      "port"
    )}`
);

const express = require("express"),
  app = express(),
  router = express.Router(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  subscribersController = require("./controllers/subscribersController"),
  coursesController = require("./controllers/coursesController"),
  usersController = require("./controllers/usersController"),
  methodOverride = require("method-override");

mongoose.connect("mongodb://localhost:27017/confetti_cuisine", (e) => {
  if (!e)
    console.log(
      "Connection to the database has been successfully established!"
    );
});

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use("/", router);
router.use(methodOverride("_method", { methods: ["POST", "GET"] }));
router.use(express.static("public"));
router.use(layouts);
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/", homeController.showHomePage);
router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/users", usersController.index, usersController.indexView);
router.get(
  "/subscribers",
  subscribersController.index,
  subscribersController.indexView
);
router.get("/subscribers/new", subscribersController.new);
router.get("/users/new", usersController.new);
router.get("/courses/new", coursesController.new);
router.get(
  "/subscribers/:id",
  subscribersController.show,
  subscribersController.showView
);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/courses/:id", coursesController.show, coursesController.showView);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.get("/users/:id/edit", usersController.edit);
router.get("/courses/:id/edit", coursesController.edit);

router.post(
  "/subscribers/create",
  subscribersController.create,
  subscribersController.redirectView
);
router.post(
  "/users/create",
  usersController.create,
  usersController.redirectView
);
router.post(
  "/courses/create",
  coursesController.create,
  coursesController.redirectView
);

router.put(
  "/subscribers/:id/update",
  subscribersController.update,
  subscribersController.redirectView
);
router.put(
  "/users/:id/update",
  usersController.update,
  usersController.redirectView
);
router.put(
  "/courses/:id/update",
  coursesController.update,
  coursesController.redirectView
);

router.delete(
  "/subscribers/:id/delete",
  subscribersController.delete,
  subscribersController.redirectView
);
router.delete(
  "/users/:id/delete",
  usersController.delete,
  usersController.redirectView
);
router.delete(
  "/courses/:id/delete",
  coursesController.delete,
  coursesController.redirectView
);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.listen(
  app.get("port"),
  () =>
    `Server has been started and listening at the port number: ${app.get(
      "port"
    )}`
);

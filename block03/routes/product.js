const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/product"),
  controller2 =require ("../controllers/category")

router.post("/add", controller.add);

router.post("/delete", controller.delete);

router.post("/update", controller.update);

router.get("/",controller2.all)

router.get("/:product", controller.product);

module.exports = router;

const router = require("express").Router();

var contactController = require("../controller/controller.js");

router.route("/contacts")
    .get(contactController.index)
    .post(contactController.new);

router.route("/contacts/:contact_id")
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);

module.exports = router;

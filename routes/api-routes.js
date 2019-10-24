const router = require("express").Router();

router.get("/",(req,res)=>{
    res.json({
        status:"Api is working 2",
        message: "Welcome to resthub"
    });
});

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

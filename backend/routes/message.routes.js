const express = require('express');
const messageController = require("../controllers/message.controller.js");
const router = express.Router();


router.post("/send/:id",messageController.sendMessage)



router.route("/:id").get((req, res) => {
 
    messageController.getMessages(req, res);

  
});


module.exports = router;

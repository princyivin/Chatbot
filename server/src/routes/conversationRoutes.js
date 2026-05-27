const express =
  require("express");

const router =
  express.Router();

const {
  findOrCreateConversation,
} = require(
  "../controllers/conversationController"
);

router.post(
  "/find-or-create",
  findOrCreateConversation
);

module.exports =
  router;
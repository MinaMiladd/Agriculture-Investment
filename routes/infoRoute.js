const express = require("express");
const {
 getOneInfoValidator,
 createInfoValidator,
 updateInfoValidator,
 deleteInfoValidator,
} = require("../utils/validators/infoValidator");
const {
getInformations,
getOneInformation,
createInformation,
updateInformation,
deleteInformation,
} = require("../services/infoService");

const router = express.Router();

router
  .route("/")
  .get(getInformations)
  .post(createInfoValidator, createInformation);

router
  .route("/:id")
  .get(getOneInfoValidator, getOneInformation)
  .put(updateInfoValidator, updateInformation)
  .delete(deleteInfoValidator, deleteInformation);
module.exports = router;

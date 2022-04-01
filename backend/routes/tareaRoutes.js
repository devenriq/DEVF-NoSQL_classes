const express = require("express");
const router = express.Router();
const {
  getTareas,
  putTareas,
  postTareas,
  deleteTareas,
} = require("../controllers/tareaControllers");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getTareas).post(protect, postTareas);
router.route("/:id").put(protect, putTareas).delete(protect, deleteTareas);

// router.get("/", getTareas);
// router.post("/", postTareas);
// router.put("/:id", putTareas);
// router.delete("/:id", deleteTareas);

module.exports = router;

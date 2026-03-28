const express = require("express");
const router = express.Router();
const { loginAdmin, registerAdmin } = require("../controllers/adminController");
const {
  getAllServices,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");
const {
  getAllRequests,
  updateRequest,
  deleteRequest,
  getDashboardStats,
} = require("../controllers/requestController");
const {
  getAllGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} = require("../controllers/galleryController");
const { protect } = require("../middleware/authMiddleware");

// Auth
router.post("/login", loginAdmin);
router.post("/register", registerAdmin); // Remove or protect this in production

// Dashboard (protected)
router.get("/stats", protect, getDashboardStats);

// Requests (protected)
router.get("/requests", protect, getAllRequests);
router.put("/request/:id", protect, updateRequest);
router.delete("/request/:id", protect, deleteRequest);

// Services (protected)
router.get("/services", protect, getAllServices);
router.post("/service", protect, createService);
router.put("/service/:id", protect, updateService);
router.delete("/service/:id", protect, deleteService);

// Gallery (protected)
router.get("/gallery", protect, getAllGalleryImages);
router.post("/gallery", protect, createGalleryImage);
router.put("/gallery/:id", protect, updateGalleryImage);
router.delete("/gallery/:id", protect, deleteGalleryImage);

module.exports = router;

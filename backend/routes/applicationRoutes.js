const express = require("express");
const Application = require("../models/Application");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// All routes below require the user to be logged in
router.use(protect);

// @route   GET /api/applications/stats
// @desc    Dashboard stats: counts by status
router.get("/stats", async (req, res) => {
  try {
    const stats = await Application.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const result = {
      total: 0,
      Applied: 0,
      Interview: 0,
      Rejected: 0,
      Offer: 0,
    };

    stats.forEach((s) => {
      result[s._id] = s.count;
      result.total += s.count;
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/applications
// @desc    Get all applications for logged-in user (filter + search + pagination)
// @query   status, search, page, limit
router.get("/", async (req, res) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;

    const query = { user: req.user._id };

    if (status && status !== "All") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { company: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ];
    }

    const pageNum = Math.max(parseInt(page), 1);
    const limitNum = Math.max(parseInt(limit), 1);
    const skip = (pageNum - 1) * limitNum;

    const [applications, total] = await Promise.all([
      Application.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Application.countDocuments(query),
    ]);

    res.json({
      applications,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/applications/:id
// @desc    Get single application
router.get("/:id", async (req, res) => {
  try {
    const application = await Application.findOne({ _id: req.params.id, user: req.user._id });
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/applications
// @desc    Create a new application entry
router.post("/", async (req, res) => {
  try {
    const { company, role, type, status, appliedDate, followUpDate, location, jobLink, notes } = req.body;

    if (!company || !role) {
      return res.status(400).json({ message: "Company and role are required" });
    }

    const application = await Application.create({
      user: req.user._id,
      company,
      role,
      type,
      status,
      appliedDate,
      followUpDate,
      location,
      jobLink,
      notes,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/applications/:id
// @desc    Update an application entry
router.put("/:id", async (req, res) => {
  try {
    const application = await Application.findOne({ _id: req.params.id, user: req.user._id });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const fields = [
      "company",
      "role",
      "type",
      "status",
      "appliedDate",
      "followUpDate",
      "location",
      "jobLink",
      "notes",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        application[field] = req.body[field];
      }
    });

    const updated = await application.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/applications/:id
// @desc    Delete an application entry
router.delete("/:id", async (req, res) => {
  try {
    const application = await Application.findOne({ _id: req.params.id, user: req.user._id });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    await application.deleteOne();
    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
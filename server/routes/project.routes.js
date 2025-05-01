const express = require("express");
const router = express.Router();
const {auth} = require("../middleware/auth.middleware")
const {
  createProject,
  fetchProjects,
  fetchProject,
  createTranscript,
  fetchTranscripts,
  fetchTranscript,
  editTranscript,
  deleteTranscript
} = require("../controllers/project.controller");

// Project routes
router.post("/create", auth, createProject);
router.get("/", auth, fetchProjects);
router.get("/:projectId", auth, fetchProject);

// Transcript routes
router.post("/transcript/:projectId", auth, createTranscript);
router.get("/transcripts/:projectId", auth, fetchTranscripts);
router.get("/:projectId/transcript/:transcriptId", auth, fetchTranscript);
router.put("/:projectId/transcript/:transcriptId/update", auth, editTranscript);
router.delete("/:projectId/transcript/:transcriptId", auth, deleteTranscript);

module.exports = router;
const { Project } = require("../models/project.model");
const { Transcript } = require("../models/transcript.model");

// creating a new project
const createProject = async (req, res) => {
  try {
    const userId = req.user._id;
    const { projectName } = req.body;
    const doc = await Project.create({
      userId,
      name: projectName, 
    });

    res.status(200).json({ success: true, message: "Project created", doc });
  } catch (error) {
    console.error("Error in project controller:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// fetching projects
const fetchProjects = async (req, res) => {
  try {
    const userId = req.user._id;

    const projectData = await Project.find({ userId });

    res.status(200).json({ 
      success: true, 
      message: "Projects fetched", 
      data: projectData 
    });
  } catch (error) {
    console.error("Error in project controller:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// fetching a single project using project id
const fetchProject = async (req, res) => {
  try {
    const userId = req.user._id;
    const { projectId } = req.params;

    const projectData = await Project.findOne({
      _id: projectId,
      userId
    });

    if (!projectData) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Project fetched", 
      data: projectData 
    });
  } catch (error) {
    console.error("Error in project controller:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// creating a new transcripts
const createTranscript = async (req, res) => {
  try {
    const userId = req.user._id;
    const { projectId } = req.params;
    const { fileName, fileDescription } = req.body;

    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    const doc = await Transcript.create({
      userId,
      projectId,
      fileName,
      fileDescription
    });

    res.status(200).json({ success: true, message: "Transcript created", doc });
  } catch (error) {
    console.error("Error in project controller:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// fetching transcripts
const fetchTranscripts = async (req, res) => {
  try {
    const userId = req.user._id;
    const { projectId } = req.params;
    
    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }
    
    const transcripts = await Transcript.find({ projectId, userId });
    
    res.status(200).json({ 
      success: true, 
      message: "Transcripts fetched", 
      data: transcripts 
    });
  } catch (error) {
    console.error("Error in project controller:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// fetching single transcript by using id
const fetchTranscript = async (req, res) => {
  try {
    const userId = req.user._id;
    const { projectId, transcriptId } = req.params;

    const transcript = await Transcript.findOne({
      _id: transcriptId,
      projectId,
      userId
    });

    if (!transcript) {
      return res.status(404).json({
        success: false,
        message: "Transcript not found"
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Transcript fetched", 
      data: transcript 
    });
  } catch (error) {
    console.error("Error in project controller:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// editing a single transcript
const editTranscript = async (req, res) => {
  try {
    const userId = req.user._id;
    const { projectId, transcriptId } = req.params;
    const {fileDescription } = req.body;

    const transcript = await Transcript.findOneAndUpdate(
      { 
        _id: transcriptId, 
        projectId, 
        userId 
      },
      {
        fileDescription
      },
      { new: true }
    );

    if (!transcript) {
      return res.status(404).json({
        success: false,
        message: "Transcript not found"
      });
    }

    res.status(200).json({ success: true, message: "Transcript updated", doc: transcript });
  } catch (error) {
    console.error("Error in project controller:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// deleting a single transcript
const deleteTranscript = async (req, res) => {
  try {
    const userId = req.user._id;
    const { projectId, transcriptId } = req.params;

    const transcript = await Transcript.findOneAndDelete({ 
      _id: transcriptId, 
      projectId, 
      userId 
    });

    if (!transcript) {
      return res.status(404).json({
        success: false,
        message: "Transcript not found"
      });
    }

    res.status(200).json({ success: true, message: "Transcript deleted", doc: transcript });
  } catch (error) {
    console.error("Error in project controller:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// export all project controllers
module.exports = {
  createProject,
  fetchProjects,
  fetchProject,
  createTranscript,
  fetchTranscripts,
  fetchTranscript,
  editTranscript,
  deleteTranscript
};
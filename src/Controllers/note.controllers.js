const ProjectNote = require("../Models/note.models");
const Project = require("../Models/project.models");
const ApiResponse = require("../utils/api-response");
const ApiError = require("../utils/ap-error");
const asyncHandler = require("../utils/async-handler");
const mongoose = require("mongoose");

const getNotes = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const notes = await ProjectNote.find({
    project: new mongoose.Types.ObjectId(projectId),
  }).populate("createdBy", "username fullName avatar");

  return res
    .status(200)
    .json(new ApiResponse(200, notes, "Project notes fetched successfully"));
});

const createNote = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { content } = req.body;

  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const note = await ProjectNote.create({
    project: new mongoose.Types.ObjectId(projectId),
    createdBy: new mongoose.Types.ObjectId(req.user._id),
    content,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, note, "Project note created successfully"));
});

const getNoteById = asyncHandler(async (req, res) => {
  const { noteId } = req.params;

  const note = await ProjectNote.findById(noteId).populate(
    "createdBy",
    "username fullName avatar"
  );
  if (!note) {
    throw new ApiError(404, "Project note not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, note, "Project note fetched successfully"));
});

const updateNote = asyncHandler(async (req, res) => {
  const { noteId } = req.params;
  const { content } = req.body;

  const note = await ProjectNote.findByIdAndUpdate(
    noteId,
    { $set: { content } },
    { new: true }
  );

  if (!note) {
    throw new ApiError(404, "Project note not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, note, "Project note updated successfully"));
});

const deleteNote = asyncHandler(async (req, res) => {
  const { noteId } = req.params;

  const note = await ProjectNote.findByIdAndDelete(noteId);
  if (!note) {
    throw new ApiError(404, "Project note not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, note, "Project note deleted successfully"));
});

module.exports = {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
};

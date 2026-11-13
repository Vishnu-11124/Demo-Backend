import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user._id;

  if (!title.trim() || !description.trim()) {
    throw new ApiError(400, "The title and description are required");
  }

  const user = await User.findById(userId).select("-password -refreshToken");
  if (!user) {
    throw new ApiError(404, "The user not founded");
  }

  const videoFilePath = req.files?.videoFile[0]?.path;
  if (!videoFilePath) {
    throw new ApiError(400, "Video file should upload");
  }

  const thumbnailPath = req.files?.thumbnail[0]?.path;
  if (!thumbnailPath) {
    throw new ApiError(400, "Upload thumbnai for the video");
  }

  const videoFile = await uploadOnCloudinary(videoFilePath);
  if (!videoFile) {
    throw new ApiError(400, "Video is not uploaded");
  }

  const thumbnail = await uploadOnCloudinary(thumbnailPath);
  if (!thumbnail) {
    throw new ApiError(400, "Thumbnail is not uploaded");
  }

  const newVideo = await Video.create({
    videoFile: videoFile?.url,
    thumbnail: thumbnail?.url,
    title: title.trim(),
    description: description.trim(),
    duration: videoFile?.duration,
    owner: userId,
  });

  if (!newVideo) {
    throw new ApiError(400, "Video is not created");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, newVideo, "Video created successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId) {
    throw new ApiError(400, "Video id is required");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Successfully fetched video"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};

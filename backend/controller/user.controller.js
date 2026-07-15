import mongoose from "mongoose";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import Url from "../model/url.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../model/user.model.js";
import Click from "../model/click.model.js";

export const getUser = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	if (!userId) {
		throw new apiError(401, "user not authenticated");
	}

	const user = await User.findById(userId).select("email");
	if (!user) {
		throw new apiError(401, "user not authenticated");
	}

	return res
		.status(200)
		.json(new apiResponse(200, user, "User fected successfully"));
});

export const dashboard = asyncHandler(async (req, res) => {
	const userId = req.user._id;

	if (!userId) {
		throw new apiError(401, "user not authenticated");
	}

	const urlData = await User.aggregate([
		{
			$match: { _id: new mongoose.Types.ObjectId(userId) },
		},
		{
			$lookup: {
				from: "urls",
				localField: "_id",
				foreignField: "user",
				pipeline: [
					{
						$sort: {
							createdAt: -1,
						},
					},
					{
                      $limit: 4
					},
				],
				as: "links",
			},
		},

		{
			$project: {
				_id: 0,
				totalLinks: { $size: "$links" },
				links: 1,
			},
		},
	]);

	const totalClick = await Url.aggregate([
		{
			$match: {user: new mongoose.Types.ObjectId(userId)}
		},
		{
			$lookup: {
				from: "clicks",
				localField: "_id",
				foreignField: "url",
				as: "clicks"
			}
		},
		{
        $group: {  // group all the documents as a one and find the length of clicks array and sum all the length
            _id: null,
            totalClicks: { $sum: { $size: "$clicks" } }
        },
    }
	])

	return res
		.status(200)
		.json(new apiResponse(200, urlData[0], totalClick, "data fetched successfully"));
});

export const urlClickData = asyncHandler(async (req, res) => {
	const id = req.params;
	const click = await Click.aggregate([
		{
			$match: { url: new mongoose.Types.ObjectId(id) },
		},
		{
			$count: "totalClick",
		},
	]);
	return res.status(200).json(new apiResponse(200, click[0], "data fetched"));
});

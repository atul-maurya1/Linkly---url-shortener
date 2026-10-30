import crypto from "node:crypto";
import asyncHandler from "./asyncHandler.js";
import Url from ".././model/url.model.js";

export const shortId = async () => {
	try {
		let id, idExits;
		do {
			id = crypto.randomBytes(6).toString("base64");
			idExits = await Url.exists({ shortCode: id }); // return _id or null
		} while (idExits); // _id object mease true => truthy value, otherwise exit
		// console.log("id is ", id)
		return id;
	} catch (error) {
		throw new Error(error);
	}
};

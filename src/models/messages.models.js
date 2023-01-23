import mongoose from "mongoose";

const schema = new mongoose.Schema(
	{
		user: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const MessagesModel = mongoose.model("Messages", schema);

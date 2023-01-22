import mongoose from "mongoose";

const schema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		code: {
			type: String,
			required: true,
			unique: true,
			minlength: 6,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		status: {
			type: Boolean,
			required: true,
		},
		stock: {
			type: Number,
			required: true,
			min: 0,
		},
		category: {
			type: String,
			required: true,
		},
		thumbnails: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const ProductsModel = mongoose.model("Products", schema);

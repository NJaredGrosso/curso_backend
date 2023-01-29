import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const schema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			index: true,
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
			index: true,
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
			index: true,
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

schema.plugin(mongooseDelete, { deletedAt: true });

export const ProductsModel = mongoose.model("Products", schema);

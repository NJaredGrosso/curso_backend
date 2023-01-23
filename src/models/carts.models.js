import mongoose from "mongoose";

const schema = new mongoose.Schema(
	{
		products: [
			{
				title: {
					type: String,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
					min: 1,
				},
				code: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

export const CartsModel = mongoose.model("Carts", schema);

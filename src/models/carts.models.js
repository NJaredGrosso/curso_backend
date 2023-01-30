import mongoose, { Schema } from "mongoose";

const schema = new mongoose.Schema(
	{
		products: [
			{
				_id: {
					type: Schema.Types.ObjectId,
					ref: "Products",
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
					min: 0,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

export const CartsModel = mongoose.model("Carts", schema);

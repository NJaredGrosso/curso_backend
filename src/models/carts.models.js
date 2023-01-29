import mongoose, { Schema } from "mongoose";

const schema = new mongoose.Schema(
	{
		products: [
			{
				producto: {
					type: Schema.Types.String,
					ref: "Products",
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

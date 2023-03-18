import { Schema, model } from "mongoose";
import { createCart } from "../services/cartsDAO/carts.mongo.js";

const cart = await createCart();

const schema = new Schema(
	{
		first_name: {
			type: String,
			required: true,
		},
		last_name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		age: {
			type: Number,
			required: true,
			min: 0,
		},
		cart: {
			type: String,
			required: true,
			default: cart._id,
		},
		password: {
			type: String,
			required: true,
			minLength: 6,
		},
		rol: {
			type: String,
			required: true,
			default: "user",
		},
	},
	{
		timestamps: true,
	}
);

export const UserModel = model("User", schema);

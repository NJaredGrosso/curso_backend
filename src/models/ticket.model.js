import { Schema, model } from "mongoose";

const schema = new Schema(
	{
		code: {
			type: String,
			required: true,
			unique: true,
		},
		amount: {
			type: Number,
			required: true,
			min: 0,
		},
		purcheaser: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export const TicketModel = model("Tickets", schema);

import { TicketModel } from "../models/ticket.model.js";
import { v4 as uuidv4 } from "uuid";
const { default: cartsMongo } = await import("./cartsDAO/carts.mongo.js");

class TicketServices {
	async createTicket(cid, email) {
		try {
			const cart = await cartsMongo.getCart(cid);
			let amount = 0;
			cart.products.forEach((product) => {
				let price = product.quantity * product._id.price;
				amount += price;
			});
			const data = {
				code: uuidv4(),
				amount: amount,
				purcheaser: email,
			};
			const ticket = TicketModel.create(data);
			return ticket;
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

export default new TicketServices();

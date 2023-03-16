import * as MessagesServices from "../services/messagesDTO/messages.mongo.js";
import { STATUS } from "../constants/constants";

export async function getMessages(req, res) {
	try {
		const response = await MessagesServices.getMessages();
		return response;
	} catch (error) {
		res.status(400).json({
			error: error.message,
			status: STATUS.FAIL,
		});
	}
}

export async function createMessage(req, res) {
	try {
		const response = await MessagesServices.createMessage(data);
		return response;
	} catch (error) {
		res.status(400).json({
			error: error.message,
			status: STATUS.FAIL,
		});
	}
}

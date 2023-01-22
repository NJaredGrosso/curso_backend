import { ProductsModel } from "../models/products.models.js";

export async function getProducts() {
	try {
		const products = await ProductsModel.find();
		return products;
	} catch (error) {
		throw new Error(error.message);
	}
}
export async function getProduct(pid) {}
export async function createProduct(data) {
	try {
		const product = await ProductsModel.create(data);
		return product;
	} catch (error) {
		throw new Error(error.message);
	}
}
export async function updateProduct(pid, data) {}
export async function deleteProduct(pid) {}

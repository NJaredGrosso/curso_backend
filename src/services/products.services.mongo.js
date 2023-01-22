import { ProductsModel } from "../models/products.models.js";

export async function getProducts() {
	try {
		const products = await ProductsModel.find({
			deletedAt: { $exists: false },
		});
		return products;
	} catch (error) {
		throw new Error(error.message);
	}
}
export async function getProduct(pid) {
	try {
		const product = await ProductsModel.findById(pid);
		return product;
	} catch (error) {
		throw new Error(error.message);
	}
}
export async function createProduct(data) {
	try {
		const product = await ProductsModel.create(data);
		return product;
	} catch (error) {
		throw new Error(error.message);
	}
}
export async function updateProduct(pid, data) {
	try {
		const updatedProduct = await ProductsModel.findByIdAndUpdate(pid, data, {
			new: true,
		});
		return updatedProduct;
	} catch (error) {
		throw new Error(error.message);
	}
}
export async function deleteProduct(pid) {
	try {
		await ProductsModel.delete({ _id: pid });
	} catch (error) {
		throw new Error(error.message);
	}
}

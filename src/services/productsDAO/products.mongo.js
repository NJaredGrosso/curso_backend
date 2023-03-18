import { ProductsModel } from "../../models/products.models.js";
import productDTO from "./DTO.js";

export async function getProducts(limit, page, sort, query) {
	try {
		if (sort) {
			if (sort === "asc") sort = 1;
			if (sort === "desc") sort = -1;
		}
		let valores = {};
		if (query) {
			valores = {
				deletedAt: { $exists: false },
				category: query,
			};
		} else {
			valores = { deletedAt: { $exists: false } };
		}

		const products = await ProductsModel.find(valores)
			.limit(limit)
			.skip(page !== 1 ? (page - 1) * limit : 0)
			.sort({ price: sort })
			.lean();
		const pages = Math.ceil(
			(await ProductsModel.countDocuments(valores)) / limit
		);
		const prevPage = page - 1;
		const nextPage = page + 1;
		const hasPrevPage = prevPage <= 0 ? false : true;
		const hasNextPage = nextPage > pages ? false : true;

		const respuesta = {
			status: "succes",
			payload: products,
			totalPages: pages,
			prevPage: prevPage,
			nextPage: nextPage,
			hasPrevPage: hasPrevPage,
			hasNextPage: hasNextPage,
		};
		return respuesta;
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function getProduct(pid) {
	try {
		const product = await ProductsModel.findById(pid);
		const response = new productDTO(product);
		return response;
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

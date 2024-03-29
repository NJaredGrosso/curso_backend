import * as AuthServices from "../services/auth.services.js";

export async function login(req, res) {
	try {
		const { email, password } = req.body;
		const logged = await AuthServices.login(email, password);
		if (logged) {
			req.session.logged = true;
			req.session.current = {
				first_name: logged.first_name,
				last_name: logged.last_name,
				age: logged.age,
				email: logged.email,
				cart: logged.cart,
				rol: logged.rol,
			};
			res.send("Sesion iniciada correctamente");
		} else {
			res.status(400).send("Usuario o Clave incorrectos");
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
}

export async function logout(req, res) {
	try {
		req.session.destroy((err) => {
			if (err) {
				res.json(err);
			} else {
				res.send("Salio de la aplicacion");
			}
		});
	} catch (error) {
		res.status(400).send(error.message);
	}
}

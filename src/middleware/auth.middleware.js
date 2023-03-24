export function userAuth(req, res, next) {
	if (req.session.logged) {
		if (req.session.current.rol === "user") {
			req.session.touch();
			next();
		}
	} else {
		res.status(400).send("Debes logearte para ver esto");
	}
}

export function adminAuth(req, res, next) {
	if (req.session.logged) {
		if (req.session.current.rol === "admin") {
			req.session.touch();
			next();
		}
	} else {
		res.status(400).send("Debes ser Administrador para ver esto");
	}
}

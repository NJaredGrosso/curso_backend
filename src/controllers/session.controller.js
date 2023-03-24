export async function showUser(req, res) {
	try {
		res.status(200).json({ user: req.session.current });
	} catch (error) {
		res.status(400).send(error.message);
	}
}

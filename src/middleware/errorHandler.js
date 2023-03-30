export default (error, req, res, next) => {
	console.log(
		error.message,
		req.path,
		{ query: req.query },
		{ params: req.params },
		{ body: req.body },
		{ user: req?.user }
	);
	next();
};

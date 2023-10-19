const verifyTokenUser = async (req, res, next) => {
	const bearerToken =
		req.body.bearerToken || req.query.bearerToken || req.headers["authorization"];

	if (!bearerToken) {
		return res.status(401).send("Unauthorized");
	}
	try {
		if (bearerToken.startsWith("Bearer")) {
			var token = bearerToken.replace(/Bearer /g, "");
			jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
				if (err) {
					return res.status(401).send("Unauthorizeddss");
				} else {
					var decoded = jwtDecode(token);
					var userExist = await users.findOne({
						where: { id: decoded.userId },
					});
					if (userExist == null) {
						return res.status(401).send("Unauthorizedaaa");
					} else {
						req["user"] = userExist;
						return next();
					}
				}
			});
		} else {
			return res.status(401).send("Unauthorized");
		}
	} catch (err) {
		return res.status(401).send("Unauthorized");
	}
};

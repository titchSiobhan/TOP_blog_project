import jwt from 'jsonwebtoken';

//format token
// authorization: Bearer <access_token>
//verify token
function verifyToken(req, res, next) {
    console.log("AUTH HEADER:", req.headers.authorization);
	//get auth header value
	const bearerHeader = req.headers['authorization'];

	if (!bearerHeader) {
        

		return res.status(403).json({ error: 'No token' });

	}

	const token = bearerHeader.split(' ')[1];

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
             console.log("JWT ERROR:", err);
			return res.status(403).json({ error: 'Invalid token' });
		}
         console.log("DECODED TOKEN:", decoded);

		req.user = decoded.user;
		next();
	});
}

export default verifyToken;

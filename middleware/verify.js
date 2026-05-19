//format token
// authorization: Bearer <access_token>
//verify token
function verifyToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers['authorization'];
console.log("Authorization header:", req.headers['authorization']);
console.log("Token extracted:", req.token);

    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        //set token
        req.token = bearerToken;
        
        next()
    } else {
        //forbidden
        res.sendStatus(403)
    }
}

export default verifyToken
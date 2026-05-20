import jwt from 'jsonwebtoken'

//format token
// authorization: Bearer <access_token>
//verify token
function verifyToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers['authorization'];


    // //check if bearer is undefined
    // if(typeof bearerHeader !== 'undefined') {
    //     const bearer = bearerHeader.split(' ');
    //     //get token from array
    //     const bearerToken = bearer[1];
    //     //set token
    //     req.token = bearerToken;
        
    //     next()
    // } else {
    //     //forbidden
    //     res.sendStatus(403)
    // }
    if (!bearerHeader) {
        return res.sendStatus(403); 
    }
        
        const token = bearerHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({error: 'Invalid token'})
            }
            req.user = decoded.user;
            next()
        })
    }


export default verifyToken
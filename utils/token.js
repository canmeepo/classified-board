const jwt = require('jsonwebtoken');

exports.verifyToken = async(req) => {
    const token = req.headers["authorization"];
    if (token) {
        try {
            return await jwt.verify(token, process.env.SECRET);
        } catch (e) {
            console.log(e, "Your session expried. Sign in again")
        }
    }
};
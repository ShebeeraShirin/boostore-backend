const jwt = require('jsonwebtoken')

const adminMiddleware = (req, res, next) => {
    console.log("Inside admin JWT Middleware");
    console.log(req.headers.authorization.slice(7));
    try {
        const token = req.headers.authorization.slice(7)
        const jwtVerification = jwt.verify(token, process.env.jwtKey)
        console.log(jwtVerification);
        req.payload = jwtVerification.userMail
        req.role = jwtVerification.role
        if (req.role == "Admin") {
            next()
        } else {
            res.status(403).json("authorization Error ..only admin can access  ")

        }
    }
    catch (err) {
        res.status(402).json("authorization Error " + err)
    }


}
module.exports = adminMiddleware

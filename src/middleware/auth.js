const jwt = require('jsonwebtoken');
const SECRETKEY = process.env.SECRETKEY;


const auth = (function (req, res, next) {


    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            let user = jwt.verify(token, SECRETKEY);
            req.userId = user.id;

        }
        else {
          return res.status(401).json({ 'message': ' user not authorized' });

        }

        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ 'message': 'Unauthorized user not authorized' });

    }
});

module.exports = auth;
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).send("Please login first");
    }

    const token = authHeader.split(' ')[1];
    console.log('Token: ', token); // Debugging token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded: ', decoded); // Debugging decoded token
        req.user = decoded;
        next();
    } catch (error) {
        console.log('Error: ', error); // Debugging error
        return res.status(401).send("Invalid Token");
    }
};

module.exports = auth;

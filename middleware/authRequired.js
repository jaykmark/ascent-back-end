const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Token Validation
  const bearerHeader = req.headers['authorization'];
  // Check if User if logged in by seeing if JWT exists in header
  if (typeof bearerHeader !== 'undefined') {
    // Get rid of 'Bearer' before JWT
    const token = bearerHeader.split(' ')[1];
    // Encrypt token with Session Secret
    let verified = jwt.verify(token, process.env.SESSION_SECRET);
    console.log('payload', verified);
    req.userId = verified._id;
    // Go on to next function in route
    next();
  } else {
    res.sendStatus(403);
  }
};
// middleware/verifyToken.js
module.exports = (req, res, next) => {
  // Check if the user is authenticated by checking the session
  if (!req.session || !req.session.user) { // Ensure session exists and user is stored in the session
    return res.status(401).json({ error: 'Not authenticated' });
  }

  // Attach the user data to the request object
  req.user = req.session.user;

  // Continue to the next middleware or route handler
  next();
};

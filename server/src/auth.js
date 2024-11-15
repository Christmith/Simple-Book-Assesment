const admin = require("firebase-admin");

const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied: No Token Provided" });
  }

  try {
    const idToken = token.split(" ")[1];
    if (!idToken) {
      return res.status(400).json({ message: "Token format is incorrect" });
    }

    // Verify the ID Token using Firebase Admin SDK
    const decodedUser = await admin.auth().verifyIdToken(idToken);
    req.user = decodedUser;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or Expired Token",
      error: error.message,
    });
  }
};

module.exports = verifyToken;

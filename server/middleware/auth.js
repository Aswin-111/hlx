const jwt = require("jsonwebtoken");
const secret_key = require("../key");
function auth(req, res, next) {
  console.log("in the the auth middleware");
  console.log(req.url);
  if (
    req.url.startsWith("/login") ||
    req.url.length === 0 ||
    req.url.includes("/register")
  ) {
    next();
  } else {
    const token = req.headers.authorization.split(" ")[1];


    jwt.verify(token, "supersecret", function (err, decoded) {
      console.log(decoded.userdata.Role,req.url)
      if(err){
        return res
        .status(401)
        .json({ access: false, message: "Unauthorized user" });
      }
    if(decoded){
      if (req.url.includes("/admin") && decoded.userdata.Role === "Admin") {
        next();
      } else {
        return res
          .status(401)
          .json({ access: false, message: "Unauthorized user" });
      }
      if (
        req.url.includes("/customer") &&
        decoded.userdata.Role === "Customer"
      ) {
        next();
      } else {
        return res
          .status(401)
          .json({ access: false, message: "Unauthorized user" });
      }
      if (req.url.includes("/vendor") && decoded.userdata.Role === "Vendor") {
        next();
      } else {
        return res
          .status(401)
          .json({ access: false, message: "Unauthorized user" });
      }
      
    }
    else{
      return res
      .status(401)
      .json({ access: false, message: "Unauthorized user" });
    }
    });
  }
}
module.exports = auth;

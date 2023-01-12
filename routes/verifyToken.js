const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if(err) res.status(401).json("Vous n'êtes pas autorisé")
      req.user = user;
      next()
    })
  } else {
    res.status(401).json("Vous n'est pas authentifié")
  }
}

const AuthorizeToken = (req, res, next) => {
   verifyToken(req, res, () => {
    if(req.user.id === req.params.id || req.user.isAdmin){
      next()
    } else {
      res.status(403).json("Vous n'êtes pas autorisé !")
    }
   })
} 

const AuthorizeAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
   if(req.user.isAdmin){
     next()
   } else {
     res.status(403).json("Vous n'êtes pas autorisé !")
   }
  })
} 

module.exports = {verifyToken, AuthorizeToken, AuthorizeAdmin} 
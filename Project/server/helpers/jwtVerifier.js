require("dotenv").config(); // loading env variables
const jwt = require("jsonwebtoken");
const { SECRET = "secret" } = process.env;


module.exports = async (ctx, next) => {

  const { authorization } = ctx.headers;

  if (!authorization) {
    ctx.throw(401);
  }
  const token = authorization.split(" ")[1]; //split the header and get the token

  try {
    const claims = await jwt.verify(token, SECRET);

    //if claim does not exist
    if (!claims) {
      ctx.throw(401);
    }
    
    //add user information about the owner of the claim
    ctx.user = claims.uname;
    ctx.idUser = claims.idUser

  }
  catch (err) {
    ctx.throw(401);
  }

  await next();
}
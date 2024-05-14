const KoaRouter = require('koa-router');
const userController = require('../controllers/userController.dbops');
const jwtVerifier = require("../helpers/jwtVerifier")
const RateLimit = require('koa2-ratelimit').RateLimit;

const userRouter = new KoaRouter();
const publicUserRouter = new KoaRouter();

const SignInlimiter = RateLimit.middleware({
  interval: { min: 5 }, // 15 minutes = 15*60*1000
  max: 10, // start blocking after 10 requests
  message: "You have tried too many times to connect to API within 5 minutes. Please try again later.",
});

userRouter.use(jwtVerifier)

// Routing REST requests
userRouter
  .get('/', userController.rootHello)
  //.get('/users', userController.getUsers)
  //.get('/users/:idUser', userController.getUser)

publicUserRouter
  .post('/users/login', SignInlimiter, userController.login)
  .post('/users/signup', SignInlimiter, userController.signUp)
  .post('/users/refresh-token', userController.refreshUser)

module.exports = { userRouter, publicUserRouter };

'use strict';
const os = require('os');
const fs = require('fs');
const path = require('path');
const https = require('https');
const cors = require('@koa/cors');
const http = require('http');
const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const { userRouter, publicUserRouter } = require('./routes/userRoutes.js'); // TODO: LATER ON REFACTOR THIS => THINK NOT NEEDED
const { fileRouter } = require('./routes/fileRoutes.js');
const { fileRouterPublic } = require('./routes/fileRoutes.js');
const { folderRouter } = require('./routes/folderRoutes.js');
const { folderRouterPublic } = require('./routes/folderRoutes.js');
const { permissionRouter } = require('./routes/permissionRoutes.js');
const app = new Koa();
const dbModels = require('./models');
const url = require('url');

//logger
app.use(logger());

// SSRF protection middleware
app.use(async (ctx, next) => {
  const { protocol, path } = url.parse(ctx.request.url);

  // Validate the request against a blacklist of paths that are not allowed
  const blackList = ["localhost", "127.0.0.1", "127.1", "admin", "$", "%"];

  for(let i=0; i<blackList.length; i++){
    if(path.includes(blackList[i])){
      ctx.throw(403, 'Forbidden');
      return;
    }
  }

  await next();
});


//cors
const koaOptions = {
  origin:'http://localhost:8080', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
};

app.use(cors(koaOptions))

//body parser
app.use(bodyParser());

app.use(async (ctx, next) => {
  ctx.set('Content-Security-Policy-Report-Only', "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'; frame-ancestors 'self'");
  await next();
});

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.use(publicUserRouter.routes());
app.use(publicUserRouter.allowedMethods());

app.use(fileRouter.routes());
app.use(fileRouter.allowedMethods());

app.use(fileRouterPublic.routes());
app.use(fileRouterPublic.allowedMethods());

app.use(folderRouter.routes());
app.use(folderRouter.allowedMethods());

app.use(folderRouterPublic.routes());
app.use(folderRouterPublic.allowedMethods());

app.use(permissionRouter.routes());
app.use(permissionRouter.allowedMethods());

// build server
const serverCallback = app.callback();


// server configuration (HTTP) and (HTTPS)
const config = {
  domain: os.hostname(),
  https: {
    port: 9000,
  },
  http: {
	  port: 9001
  }	  
};

// bind the server callback function to listening a port
try {
  dbModels.sequelize.sync().then( (req) => { // whenever we try to run the server is going to be calling for the models seeing if there is already a tabel, if there isn't creates one.
    const httpServer = http.createServer(serverCallback);
    httpServer.listen(config.http.port, function (err) {
      if (!!err) {
        console.error('HTTP fail: ', err, (err && err.stack));
      }
      else {
        console.log('Server running on http://' + config.domain + ':' + config.http.port);
      }
    });
    app.context.baseHttp = 'http://' + config.domain + ':' + config.http.port
  });
}
catch (exc) {
  console.error('Exited: ', exc, (exc && exc.stack));
}


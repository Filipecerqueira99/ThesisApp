const KoaRouter = require('koa-router');
const fileController = require('../controllers/fileController.dbops');
const multer = require('@koa/multer')
const jwtVerifier = require("../helpers/jwtVerifier")

const fileRouter = new KoaRouter();
fileRouter.use(jwtVerifier)

const fileRouterPublic = new KoaRouter();

let storage = multer.diskStorage({   
  destination: function(req, file, cb) { 
     cb(null, '../uploads/');    
  }, 
  filename: function (req, file, cb) { 
     cb(null , file.originalname);   
  }
});

const upload = multer({ storage: storage });

// Routing REST requests
fileRouter
  .post('/files', fileController.postFileTo) // Post a file to the root (idFolder=0) or to a folder (idFolder=idFolder in table folder)
  .post('/files/create', fileController.createFile) // creates a new file row
  .put('/files/:idFile/state', fileController.updateStateFile) // Updates a file state
  .put('/files/:idFile/name', fileController.updateNameFile) // Updates a file state
  .delete('/files/:idFile', fileController.deleteFile) //delete specific file
  //.get('/files/:idUser', fileController.getUserFiles) //get users' files
  .get('/files/:idFile', fileController.getFile) //get specific file
  .get('/files/:idFolder/children', fileController.getFilesInsideOfFolder) //get files inside of folder (idFolder=idFolder in table folder) or root (idFolder=0)
  .get('/files/:idFolder/children/public', fileController.getPublicFilesInside) //get public files inside of the root (idFolder=0) or folder (idFolder=idFolder in table folder)
  .get('/files/:idFile/download', fileController.downloadFile)
  .post('/files/:idFile/upload', upload.single('file'), fileController.uploadFile)

fileRouterPublic
  .get('/files/public/:nameUser/:nameFolder', fileController.getUserPublicFiles) // get users' public files in the root (idFolder==0) or inside of another folder (idFolder==idFolder in table folder)
  

module.exports = { fileRouter, fileRouterPublic };

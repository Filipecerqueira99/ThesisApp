const KoaRouter = require('koa-router');
const folderController = require('../controllers/folderController.dbops');
const jwtVerifier = require("../helpers/jwtVerifier")

const folderRouter = new KoaRouter();
const folderRouterPublic = new KoaRouter();


folderRouter.use(jwtVerifier)

folderRouter
  .post('/folders', folderController.postFolderTo) // Post a folder to the root (idFolder=0) or to a folder (idFolder=idFolder in table folder)
  .put('/folders/:idFolder/state', folderController.updateStateFolder) // Updates a folder state
  .put('/folders/:idFolder/name', folderController.updateNameFolder) // Updates folder name
  .get('/folders/:parentFolder/children', folderController.getFoldersFromParent) //get folders from root (parentFolder=0) or another folder (parentFolder=idFolder in table folder)
  
  //.get('/folders/:idUser/user', folderController.getUserFolders) //get users' folders
  .get('/folders/:idFolder', folderController.getFolder) //get a specific folder
  //.get('/folders/public/:parentFolder/children', folderController.getPublicFoldersInside) //get public folders inside of the root (idFolder=0) or folder (idFolder=idFolder in table folder)

folderRouterPublic
  .get('/folders/public/:nameUser/:nameFolder', folderController.getUserPublicFolders) // get users' public folders in the root (idFolder==0) or inside of another folder (idFolder==idFolder in table folder)


module.exports = { folderRouter, folderRouterPublic };

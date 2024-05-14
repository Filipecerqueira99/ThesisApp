const KoaRouter = require('koa-router');
const permissionsController = require('../controllers/permissionController.dbops');
const jwtVerifier = require("../helpers/jwtVerifier")

const permissionRouter = new KoaRouter();

permissionRouter.use(jwtVerifier)

permissionRouter
  .get('/folders/:idNewUser/:idFolder/:permission/permissions', permissionsController.giveUserFolderPermission) //give user permission to a folder
  .get('/files/:idNewUser/:idFile/:permission/permissions', permissionsController.giveUserFilePermission) //give user permission to a file || PS -> I KNOW I COULD EDIT THE ABOVE METHOD BUT WOULD NEED A LOT OF REFACTOR
  .put('/files/:idFile/:idUser/permissions', permissionsController.editFilePermission) //edits file permission
  .put('/folders/:idFolder/:idUser/:permission/permissions', permissionsController.editFolderPermission) //edit folder permission
  .get('/files/:idFile/:idUser/permissions', permissionsController.getUserFilePermissions) // Gets the permissions that a certain user has over a file
  .get('/folders/:idFolder/:idUser/permissions', permissionsController.getUserFolderPermissions) // Gets the permissions that a certain user has over a folder

module.exports = { permissionRouter };

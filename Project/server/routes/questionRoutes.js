const KoaRouter = require('koa-router');
const questionController = require('../controllers/questionController.dbops.js');
const jwtVerifier = require("../helpers/jwtVerifier")

const questionRouter = new KoaRouter();
const questionRouterPublic = new KoaRouter();


questionRouter.use(jwtVerifier)

questionRouter
    //.post('/folders', folderController.postFolderTo) // Post a folder to the root (idFolder=0) or to a folder (idFolder=idFolder in table folder)
    //.put('/folders/:idFolder/state', folderController.updateStateFolder) // Updates a folder state
    //.put('/folders/:idFolder/name', folderController.updateNameFolder) // Updates folder name
    //.get('/folders/:parentFolder/children', folderController.getFoldersFromParent) //get folders from root (parentFolder=0) or another folder (parentFolder=idFolder in table folder)

    //.get('/folders/:idUser/user', folderController.getUserFolders) //get users' folders

    //.get('/folders/public/:parentFolder/children', folderController.getPublicFoldersInside) //get public folders inside of the root (idFolder=0) or folder (idFolder=idFolder in table folder)

questionRouterPublic
    .get('/folders/public/:nameUser/:nameFolder', questionController.getUserPublicFolders) // get users' public folders in the root (idFolder==0) or inside of another folder (idFolder==idFolder in table folder)
    .get('/questions/randomMultipleOption', questionController.getRandomMultipleOptionQuestion) //get a random question
    .get('/questions/randomFiveQuestions', questionController.getFiveRandomQuestions) //get a random question
    .get('/questions/getFiveRandomQuestionsFromCategory/:category_id', questionController.getFiveRandomQuestionsFromCategory) //get a random question




module.exports = {questionRouterPublic, questionRouter };
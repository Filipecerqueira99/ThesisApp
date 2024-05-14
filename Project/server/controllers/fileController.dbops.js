'use strict';
const db = require('../models')
const fs = require('fs');
const permissionsController = require('../controllers/permissionController.dbops');


// Create main Model
const User = db.users
const File = db.files
const Folder = db.folders
const UserFileHas = db.userFileHas

// Mian Work

// TODO: WHEN POSTING TO A FOLDER WE NEED TO SEE IF THE USER AS PERMISSIONS TO POST INTO IT
// TODO: WE NEED TO IMPLEMENT ROLLEBACK WHEN THERE IS AN ERROR INSERTING AN ARROW INTO userFileHasCreated TABLE
// Posts a file to the root (if idFolder=0) or to a folder (if idFolder=x, x parte of idFolders in table Folder).
// By default, permissions of a file are "Edit" and state is "Public
const postFileTo = async (ctx) => {
  let idUser = ctx.idUser;
  let nameFile = ctx.request.body.nameFile;
  let idFolder = ctx.request.body.idFolder;
  let error = await validationsPostFileTo(idUser, nameFile, idFolder);
  if(error == ""){
    try{
      const fileCreated = await File.create( {
        "nameFile": nameFile,
        "idFolder": idFolder,
        "state": "Public",
        "owner": ctx.user
      } ) 
      const userFileHasCreated = await UserFileHas.create({
        "idUserHasUFi": idUser,
        "idFileHasUFi": fileCreated.idFile,
        "permissionHasUFi": "Edit"
      })
      ctx.body = fileCreated
      console.log({"FileCreated": fileCreated, "UserFileHasCreated": userFileHasCreated})
    }
    catch(e){
      ctx.body = "Something went wrong with the file creation";
      console.log(e);
    }
  }else{
    ctx.body = error;
  }
}

// Updtaes a file state (Public or Private)
const updateStateFile = async (ctx) => {
  let idFile = ctx.params.idFile;
  let state = ctx.request.body.state;
  let error = await permissionsController.validatesIfUserHasFilePermission(ctx.idUser, idFile, "Edit");
  if(error == ""){
    try{
      const fileUpdated = await File.update({"stateFile": state}, { where: {idFile: idFile}})
      ctx.body = fileUpdated;
    }
    catch(e){
      ctx.body = "Something went wrong when updating the file state.";
      console.log(e);
    }
  }else{
    ctx.body = error;
  }
}

// Updtaes a file state (Public or Private)
const updateNameFile = async (ctx) => {
  let idFile = ctx.params.idFile;
  let name = ctx.request.body.name;
  let error = await permissionsController.validatesIfUserHasFilePermission(ctx.idUser, idFile, "Edit");
  if(error == ""){
    try{
      let oldFile = await File.findOne({where: {idFile: idFile}}); // See if file exists
      const newName = name + "." + oldFile.nameFile.split(".").slice(-1)
      const fileUpdated = await File.update({"nameFile": newName}, { where: {idFile: idFile}})
      ctx.body = fileUpdated;
    }
    catch(e){
      ctx.body = "Something went wrong when updating the file name.";
      console.log(e);
    }
  }else{
    ctx.body = error;
  }
}

// Gets a specific file
const getFile = async (ctx) => {
  let idFile = ctx.params.idFile;
  let error = await permissionsController.validatesIfUserHasFilePermission(ctx.idUser, idFile, "View");
  console.log("error: " + error);
  if(error == ""){
    try{
      let foundFile = await File.findOne({where: {idFile: idFile}});
      ctx.body = foundFile;
    }catch(e){
      ctx.body = "Error on accessing the specified file.";
      console.log(e);
    }
  }else{
    ctx.body = error;
  }
}

// Get file inside of a folder (idFolder=idFolder in table folder) or root (idFolder=0)
const getFilesInsideOfFolder = async (ctx) => {
  let idFolder = ctx.params.idFolder;
  let error = await validateFolderExist(idFolder);
  if(error == ""){
    try{
      let foundFiles = await File.findAll({where: {idFolder: idFolder}});
      let filteredFiles = await filterFilesOnRights(foundFiles, ctx.user, ctx.idUser);
      if(filteredFiles.length != 0){
        ctx.body = filteredFiles
      }
      else{
        //ctx.body = "The specified folder has no files inside";
        ctx.body = "";
      }
    }catch(e){
        ctx.body = "Error accessing the files of the specified folder";
        console.log(e);
    }
  }else{
    ctx.body = error
  }
}

//filterfiles based on view right
const filterFilesOnRights = async (foundFiles, user, idUser) => {
  let filteredFiles = []

  //Cycles every files
  for (let index = 0; index < foundFiles.length; index++) {
    //Checks if the user is the owner
    if(foundFiles[index].dataValues.owner == user || foundFiles[index].dataValues.stateFile == 'Public'){
      filteredFiles.push(foundFiles[index].dataValues);
    }else{
      //If the user is NOT the owner go check on the other table if he has permissions over the file
      let foundSingleFile = await UserFileHas.findOne({where: {idFileHasUFi: foundFiles[index].dataValues.idFile, idUserHasUFi: idUser}});
      if(foundSingleFile){
        filteredFiles.push(foundFiles[index].dataValues);
      }else{
        console.log("NULL -> Didn't find any file");
      }
    }
  }
  return filteredFiles;
}

// Gets public files of root (idFolder = 0) or inside of a certain folder (idFolder = idFolder of the Folders' table)
const getPublicFilesInside = async (ctx) => {
  let idFolder = ctx.params.idFolder;
  let error = await validateFolderExist(idFolder);
  if(error == ""){
    try{
      let publicFilesInside = await File.findAll({where: {idFolder: idFolder, stateFile: "Public"}});
      ctx.body = publicFilesInside      
    }catch(e){
      ctx.body = "Something went wrong while trying to access the public files inside of the root/folder."
      console.log(e);
    }
  }else{
    ctx.body = error;
  }  
}

// Gets Users' files
const getUserFiles = async (ctx) => {
  let idUser = ctx.params.idUser;
  let error = await validationsGetUserFiles(idUser);
  if(error == ""){
    try{
      let filesUserFound = await UserFileHas.findAll({where: {idUserHasUFi: idUser}});
      let filteredFiles = await filterFilesOnRights(filesUserFound, ctx.user, ctx.idUser);
      if(filteredFiles.length != 0){
        ctx.body = filteredFiles
      } else{
        ctx.body = "";
      }
    }catch(e){
      ctx.body = "Something went wrong while geting users' files."
      console.log(e);
    }
  }else{
    ctx.body = error;
  }  
}

// Gets users' public files inside the root (idFolder=0) or another folder (idFolder=idFolder of the DB)
const getUserPublicFiles = async (ctx) =>{
  let nameUser = ctx.params.nameUser;
  let nameFolder = ctx.params.nameFolder;

  let error = await validationsGetUserPublicFiles(nameUser, nameFolder); 
  
  let publicFilesUser = [];
  if(error == ""){
    try{
      // Gets the user
      let userFound = await User.findOne({ where: { uname: nameUser } });

      // Get's users' files ids
      let filesilesUserFound = await UserFileHas.findAll({where: {idUserHasUFi: userFound.idUser}}); 

      // Get's the id of the folder
      let idFolderIn = 0;                                                             // idFolder = 0 means the root directory
      if(nameFolder != "root"){
        let foundFolder = await Folder.findOne({ where: { nameFolder: nameFolder } }); 
        if(foundFolder!=null){
          idFolderIn = foundFolder.idFolder;
        }
      }

      // From the found users' files verifies which ones are public and inside the intended folder (idFolder=0 || idFoder = idFolder from the DB)
      let i=0;
      while(i<filesilesUserFound.length){
        let file = await File.findOne({where: {idFile: filesilesUserFound[i].idFileHasUFi, stateFile: "Public", idFolder: idFolderIn}}); 
        if(file != null){
          publicFilesUser.push(file);
        }
        i++;
      }
      ctx.body = publicFilesUser;
    } catch(e){
      ctx.body = "Something went wrong while getting users' public files."
      console.log(e);
    }
  } else{
    ctx.body = error;
  }
}


async function validationsPostFileTo(idUser, nameFile, idFolder){
  let userFound = await User.findOne({where: {idUser: idUser}}); // See if user exists
  let fileNameFound = await File.findOne({where: {nameFile: nameFile}}); // See if ther's already a file with that name
  let folderFound = 0
  if(idFolder != 0){ // if equals to 0 we are posting to the root
    folderFound = await Folder.findOne({where: {idFolder: idFolder}}); // See if folder exists
  }
  let error = ""
  if(userFound == null){
    error = "User doesn't exist\n"
  }
  if(fileNameFound != null){
    error += "There is already a file with that name\n"
  }
  if(idFolder != 0 && folderFound == null){
    error += "Selected Folder doesn't exist\n"
  } 
  return error;
}

async function validateFolderExist(idFolder){
  let foundFolder = await Folder.findOne({where: {idFolder: idFolder}}); // See if folder exists
  let error = ""
  if( idFolder != 0 && foundFolder == null){
    error = "Fodler doesn't exist.\n";
  }
  return error;
}

async function validationsGetUserFiles(idUser){
  let userFound = await User.findOne({where: {idUser: idUser}}); // See if user exists
  let error = ""
  if( userFound == null){
    error = "User doesn't exist.\n";
  }
  return error;
}

async function downloadFile(ctx) {
  let idFile = ctx.params.idFile;
  let error = await permissionsController.validatesIfUserHasFilePermission(ctx.idUser, idFile, "View");
  console.log("error: " + error);
  if(error == ""){
    try{
      let foundFile = await File.findOne({where: {idFile: idFile}});
      const type = foundFile.nameFile.split(".").slice(-1)

      const fileName = __dirname  + `/../../uploads/${foundFile.owner}/${foundFile.idFile}.${type}`;

      try {
        if (fs.existsSync(fileName)) {
          ctx.body = fs.createReadStream(fileName);
          ctx.attachment(fileName);
        } else {
          console.log(fileName)
          ctx.throw(400, "Requested file not found on server");
        }
      } catch(error) {
        ctx.throw(500, error);
      } 
    }catch(e){
      ctx.throw(400, "Error on accessing the specified file.")
      console.log(e);
    }
  }else{
    ctx.body = error;
  } 
}

async function uploadFile(ctx) {
  try {
    const file = ctx.file
    const user = ctx.user
    const idFile = ctx.params.idFile
    const destinationFolder = __dirname  + `/../../uploads/${user}/`;

    fs.mkdirSync(destinationFolder, { recursive: true });

    const sourcePath = __dirname  + `/../../uploads/${file.filename}`;
    const type = file.filename.split(".").slice(-1)
    const destinationPath = __dirname  + `/../../uploads/${user}/${idFile}.${type}`;

    fs.rename(sourcePath, destinationPath, (err) => {
      if (err) {
        ctx.throw(400, 'Error moving file: ' + err)
        console.log("moving file failed")
      } else {
        console.log("success " + idFile)
      }
    });
    
    ctx.body = idFile

  } catch (error) {
    ctx.status = 400
    ctx.body = error.message
  }
}

const createFile = async (ctx) => {
  console.log(ctx.request.body)
  let idUser = ctx.idUser
  let nameFile = ctx.request.body.nameFile;
  let contentFile = ctx.request.body.contentFile;
  let parentFolder = ctx.request.body.idFolder ? ctx.request.body.idFolder : 0;
  let error = await validationsPostFileTo(idUser, nameFile, parentFolder);
  console.log(error);
  if (error == "") {
  try {
      const fileCreated = await File.create({
        "idFolder": parentFolder,
        "nameFile": nameFile + '.txt',
        "contentFile": contentFile,
        "stateFile": "Private",
        "owner": ctx.user,
      });
      const userFileHasCreated = await db.userFileHas.create({
        idUserHasUFi: idUser,
        idFileHasUFi: fileCreated.idFile,
        permissionHasUFi: "Edit",
      });
      ctx.body = fileCreated;
    } catch (e) {
      ctx.body = "Something went wrong with the folder creation";
      console.log(e);
    }
  } else {
    ctx.body = error;
  }
};


async function validationsGetUserPublicFiles(nameUser, nameFolder){
  let foundFolder = null;
  if(nameFolder != "root"){
    foundFolder = await Folder.findAll({ where: { nameFolder: nameFolder } }); // See if folder exists
  }
  let userFound = await User.findAll({ where: { uname: nameUser } }); // See if user exists

  let error = "";
  if (foundFolder == null && nameFolder!="root") {
    error = "Fodler doesn't exist.\n";
  }
  if (userFound == null) {
    error += "User doesn't exist.\n";
  }
  if(userFound>1){
    error += "There is more than 1 user with that name. And usernames should be unique \n";
  }
  if(foundFolder == null && nameFolder!="root"){
    error += "There is more than 1 folder with that name. And folder names should be unique \n";
  }
  return error;
}

// Gets a specific file
const deleteFile = async (ctx) => {
  let idFile = ctx.params.idFile;
  let error = await permissionsController.validatesIfUserHasFilePermission(ctx.idUser, idFile, "Edit");
  console.log("error: " + error);
  if(error == ""){
    try{
      let foundFile = await File.destroy({where: {idFile: idFile}});
      ctx.body = foundFile;
    }catch(e){
      ctx.body = "Error on deleting the specified file.";
      console.log(e);
    }
  }else{
    ctx.body = error;
  }
}

module.exports = {
  postFileTo,
  updateStateFile,
  getFile,
  getFilesInsideOfFolder,
  getPublicFilesInside,
  getUserFiles,
  downloadFile,
  uploadFile,
  getUserPublicFiles,
  deleteFile,
  createFile,
  updateNameFile
}
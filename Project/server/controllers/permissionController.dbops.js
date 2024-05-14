'use strict';
const db = require('../models')

// Create main Model
const File = db.files
const Folder = db.folders
const UserFileHas = db.userFileHas
const User = db.users
const UserFolderHas = db.userFolderHas


// Main Work

// TODO: WE NEED TO SEE IF THE USER IS THE ONE WHO CREATED THE FILE => IF SO WE CAN UPDATE THE FILE PERMISSIONS
// edits the file permissions
const editFilePermission = async (ctx) => {
  let idUserHasUFi = ctx.params.idUser;
  let idFileHasUFi = ctx.params.idFile;
  let permissionHasUFi = ctx.request.body.permission;
  let erro = await validatesEditFilePermission(idUserHasUFi, idFileHasUFi, permissionHasUFi);
  if(erro == ""){
    try{
      const permissionFileUpdated = await UserFileHas.update({"permissionHasUFi": permissionHasUFi}, { where: {"idFileHasUFi": idFileHasUFi}}, {where: {"idUserHasUFi": idUserHasUFi}})
      ctx.body = permissionFileUpdated;
    }catch(e){
      ctx.body = "Error while updating file permissions."
      console.log(e);
    }
  }else{
    ctx.body = erro
  }
}

// TODO: WE NEED TO SEE IF THE USER IS THE ONE WHO CREATED THE Folder => IF SO WE CAN UPDATE THE FOLDER PERMISSIONS
// edits the folder permissions
const editFolderPermission = async (ctx) => {
  let idUserHasUFo = ctx.params.idUser;
  let idFolderHasUFo = ctx.params.idFolder;
  let permissionHasUFo = ctx.request.params.permission;
  let erro = await validatesEditFolderPermission(idUserHasUFo, idFolderHasUFo, permissionHasUFo);
  if(erro == ""){
    try{
      const permissionFolderUpdated = await UserFolderHas.update({"permissionHasUFo": permissionHasUFo}, { where: {"idFolderHasUFo": idFolderHasUFo}}, {where: {"idUserHasUFo": idUserHasUFo}})
      ctx.body = permissionFolderUpdated;
    }catch(e){
      ctx.body = "Error while updating folder permissions."
      console.log(e);
    }
  }else{
    ctx.body = erro
  }
}

// give folder permission to a new user
const giveUserFolderPermission = async (ctx) => {
  let idMainUserHasUFo = ctx.idUser;
  let idNewUserHasUFo = ctx.params.idNewUser;
  let idFolderHasUFo = ctx.params.idFolder;
  let permissionHasUFo = ctx.params.permission;
  console.log(idMainUserHasUFo+idNewUserHasUFo+idFolderHasUFo+permissionHasUFo)
  let erro = await validatesIfUserHasFolderPermission(idMainUserHasUFo, idFolderHasUFo, "Edit");
  //TODO: Verify if the user already has EDIT permission over that folder, right now you can just duplicate fields in the table 
  if(erro == ""){
    try{
      const newPermissionFolderCreated = await UserFolderHas.create({
        idUserHasUFo: idNewUserHasUFo,
        idFolderHasUFo: idFolderHasUFo,
        permissionHasUFo: permissionHasUFo,
      });
      let userFound = await User.findOne({where: {idUser: idNewUserHasUFo}});
      newPermissionFolderCreated.dataValues.userName = userFound.dataValues.uname;
      ctx.body = newPermissionFolderCreated;
    }catch(e){
      ctx.body = "Error while updating folder permissions."
      console.log(e);
    }
  }else{
    ctx.body = erro
  } 
}
//Check if the MainUser whos giving permissions has "Edit" permissions to give those to a newUser
async function validatesIfUserHasFolderPermission(idUserHasUFo, idFolderHasUFo, permission){
  let permissionHasUFo = await UserFolderHas.findOne({where: {idUserHasUFo: idUserHasUFo, idFolderHasUFo: idFolderHasUFo}});
  //console.log(permissionHasUFo.dataValues.permissionHasUFo);
  let error = ""
  if(permissionHasUFo){ 
    if(permission == "Edit" && permissionHasUFo.dataValues.permissionHasUFo != "Edit"){
      error += "User has no edit permission.\n";
    }
  } else error += "User has no required permission.\n";
  return error;
}

// Gets the permissions that a certain user has over a file
const getUserFilePermissions = async (ctx) => {
  let idFile = ctx.params.idFile;
  let idUser = ctx.params.idUser;
  var error = await validateGetFilePermissions(idFile, idUser);
  if(error == ""){
    try{
      let filePermissions = await UserFileHas.findOne({where: {idFileHasUFi: idFile}}, {where: {idUserHasUFi: idUser}});
      ctx.body = {"permission: ": filePermissions.permissionHasUFi}
    }catch(e){
      ctx.body = "Error while getting file permissions."
      console.log(e)
    }
  }else{
    ctx.body = error;
  }
};

// Gets the permissions that a certain user has over a folder
const getUserFolderPermissions = async (ctx) => {
  let idFolder = ctx.params.idFolder;
  let idUser = ctx.params.idUser;
  var error = await validateGetFolderPermissions(idFolder, idUser);
  if(error == ""){
    try{
      let folderPermissions = await UserFolderHas.findOne({where: {idFolderHasUFo: idFolder}}, {where: {idUserHasUFo: idUser}});
      ctx.body = {"permission: ": folderPermissions.permissionHasUFo}
    }catch(e){
      ctx.body = "Error while getting folder permissions."
      console.log(e)
    }
  }else{
    ctx.body = error;
  }
};

async function validatesEditFilePermission(idUserHasUFi, idFileHasUFi, permissionHasUFi){
  let idUserHasUFiFounf = await User.findOne({where: {idUser: idUserHasUFi}}); // See if user exists
  let idFileHasUFiFound = await File.findOne({where: {idFile: idFileHasUFi}}); // See if file exists
  let error = ""
  if( idUserHasUFiFounf == null){
    error += "User doesn't exist.\n";
  }
  if(idFileHasUFiFound == null){
    error += "File doesn't exist.\n";
  }
  if(!(permissionHasUFi == "View" || permissionHasUFi == "Edit")){
    error += "Allowed permissions: View and Edit.\n";
  }
  return error;
}

async function validatesEditFolderPermission(idUserHasUFo, idFolderHasUFo, permissionHasUFo){
  let idUserHasUFoFound = await User.findOne({where: {idUser: idUserHasUFo}}); // See if user exists
  let idFileHasUFoFound = await Folder.findOne({where: {idFolder: idFolderHasUFo}}); // See if folder exists

  let error = ""
  if( idUserHasUFoFound == null){
    error += "User doesn't exist.\n";
  }
  if(idFileHasUFoFound == null){
    error += "File doesn't exist.\n";
  }
  if(!(permissionHasUFo == "View" || permissionHasUFo == "Edit")){
    error += "Allowed permissions: View and Edit.\n";
  }
  return error;
}

async function validateGetFilePermissions(idFile, idUser){
  let idUserFound = await User.findOne({where: {idUser: idUser}}); // See if user exists
  let idFileFound = await File.findOne({where: {idFile: idFile}}); // See if file exists
  let error = ""
  if( idUserFound == null){
    error += "User doesn't exist.\n";
  }
  if(idFileFound == null){
    error += "File doesn't exist.\n";
  }
  return error;  
}

async function validateGetFolderPermissions(idFolder, idUser){
  let idUserFound = await User.findOne({where: {idUser: idUser}}); // See if user exists
  let idFolderFound = await Folder.findOne({where: {idFolder: idFolder}}); // See if folder exists
  let error = ""
  if( idUserFound == null){
    error += "User doesn't exist.\n";
  }
  if(idFolderFound == null){
    error += "Folder doesn't exist.\n";
  }
  return error;  
}

// give file permission to a new user
const giveUserFilePermission = async (ctx) => {
  let idMainUserHasUFi = ctx.idUser;
  let idNewUserHasUFi = ctx.params.idNewUser;
  let idFileHasUFi = ctx.params.idFile;
  let permissionHasUFi = ctx.params.permission;
  console.log(idMainUserHasUFi+idNewUserHasUFi+idFileHasUFi+permissionHasUFi)
  let erro = await validatesIfUserHasFilePermission(idMainUserHasUFi, idFileHasUFi, "Edit");
  //TODO: Verify if the user already has EDIT permission over that file, right now you can just duplicate fields in the table 
  console.log("debug1")
  if(erro == ""){
    try{
      console.log("idNewUserHasUFi: " +  idNewUserHasUFi)
      const newPermissionFileCreated = await UserFileHas.create({
        idUserHasUFi: idNewUserHasUFi,
        idFileHasUFi: idFileHasUFi,
        permissionHasUFi: permissionHasUFi,
      });
      console.log("debug2")
      let userFound = await User.findOne({where: {idUser: idNewUserHasUFi}});
      newPermissionFileCreated.dataValues.userName = userFound.dataValues.uname;
      ctx.body = newPermissionFileCreated;
    }catch(e){
      ctx.body = "Error while updating file permissions."
      console.log(e);
    }
  }else{
    ctx.body = erro
  } 
}
//Check if the MainUser whos giving permissions has permissions to give those to a newUser
async function validatesIfUserHasFilePermission(idUserHasUFi, idFileHasUFi, permission){
  let userPermissionHasUFi = await UserFileHas.findOne({where: {idUserHasUFi: idUserHasUFi, idFileHasUFi: idFileHasUFi}});
  let error = ""
  if(userPermissionHasUFi){ 
    if(permission == "Edit" && userPermissionHasUFi.dataValues.permissionHasUFi != "Edit"){
      error += "User has no edit permission.\n";
    }
  } else error += "User has no required permission.\n";
  return error;
}

module.exports = {
  editFilePermission,
  editFolderPermission,
  getUserFilePermissions,
  getUserFolderPermissions,
  giveUserFolderPermission,
  giveUserFilePermission,
  validatesIfUserHasFolderPermission,
  validatesIfUserHasFilePermission
}

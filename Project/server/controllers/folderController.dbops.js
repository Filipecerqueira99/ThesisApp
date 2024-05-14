"use strict";
const db = require("../models");
const permissionsController = require('../controllers/permissionController.dbops');

// Create main Model
const Folder = db.folders;
const User = db.users;
const UserFolderHas = db.userFolderHas;

// Mian Work

// TODO: WHEN POSTING TO A FOLDER WE NEED TO SEE IF THE USER AS PERMISSIONS TO POST INTO IT
// TODO: WE NEED TO IMPLEMENT ROLLEBACK WHEN THERE IS AN ERROR INSERTING AN ARROW INTO userFolderHasCreated TABLE
// Posts a folder to the root (if idFolder=0) or to a folder (if idFolder=x, x parte of idFolders in table Folder).
// By default, permissions of a folder are "Edit" and state is "Public"
const postFolderTo = async (ctx) => {
  let idUser = ctx.idUser;
  let nameFolder = ctx.request.body.nameFolder;
  let parentFolder = ctx.request.body.parentFolder
    ? ctx.request.body.parentFolder
    : 0;
  let error = await validationsPostFolderTo(idUser, nameFolder, parentFolder);
  console.log(error);
  if (error == "") {
    try {
      const folderCreated = await Folder.create({
        nameFolder: nameFolder,
        parentFolder: parentFolder,
        stateFolder: "Public",
        owner: ctx.user
      });
      const userFolderHasCreated = await UserFolderHas.create({
        idUserHasUFo: idUser,
        idFolderHasUFo: folderCreated.idFolder,
        permissionHasUFo: "Edit",
      });
      ctx.body = folderCreated;
      console.log({
        FileCreated: folderCreated,
        UserFileHasCreated: userFolderHasCreated,
      });
    } catch (e) {
      ctx.body = "Something went wrong with the folder creation";
      console.log(e);
    }
  } else {
    ctx.body = error;
  }
};

// Updtaes a folder state (Public or Private)
const updateStateFolder = async (ctx) => {
  let idFolder = ctx.params.idFolder;
  let state = ctx.request.body.state;
  let error = await permissionsController.validatesIfUserHasFolderPermission(ctx.idUser, idFolder, "Edit");
  if (error == "") {
    try {
      const folderUpdated = await Folder.update(
        { stateFolder: state },
        { where: { idFolder: idFolder } }
      );
      ctx.body = folderUpdated;
    } catch (e) {
      ctx.body = "Something went wrong when updating the folder state.";
      console.log(e);
    }
  } else {
    ctx.body = error;
  }
};

const updateNameFolder = async (ctx) => {
  let idFolder = ctx.params.idFolder;
  let name = ctx.request.body.name;
  let error = await permissionsController.validatesIfUserHasFolderPermission(ctx.idUser, idFolder, "Edit");
  if (error == "") {
    try {
      console.log(name)
      const folderUpdated = await Folder.update(
        { nameFolder: name },
        { where: { idFolder: idFolder } }
      );
      ctx.body = folderUpdated;
    } catch (e) {
      ctx.body = "Something went wrong when updating the folder name.";
      console.log(e);
    }
  } else {
    ctx.body = error;
  }
};

// Gets all folders in the root (idFolder=0) or inside of a parent folder (idFolder=idFolder in table folder)
const getFoldersFromParent = async (ctx) => {
  let parentFolder = ctx.params.parentFolder;
  let error = await validatesFolderExists(parentFolder);
  console.log("error " + error)
  if (error == "") {
    try {
      let foldersChild = await Folder.findAll({
        where: { parentFolder: parentFolder },
      });
      const filteredFolders = await filterFoldersOnRights(foldersChild, ctx.user, ctx.idUser);
      if(filteredFolders.length != 0){
        ctx.body = filteredFolders
      }
      else{
        //ctx.body = "The specified folder has no files inside";
        ctx.body = "";
      }
    } catch (e) {
      ctx.body =
        "Error on accessing the folders contained inside the specified folder.";
      console.log(e);
    }
  } else {
    ctx.body = error;
  }
};

// Gets users' public folders inside the root (nameFolder=root) or another folder (idFolder=idFolder of the DB)
const getUserPublicFolders = async (ctx) =>{
  let nameUser = ctx.params.nameUser;
  let nameFolder = ctx.params.nameFolder;

  let error = await validationsGetUserPublicFolders(nameUser,nameFolder);

  let publicFoldersUser = [];
  if(error == ""){
    try{
      // Gets the user
      let userFound = await User.findOne({ where: { uname: nameUser } });

      // Get's users' folder ids
      let foldersUserFound = await UserFolderHas.findAll({where: {idUserHasUFo: userFound.idUser}}); 

      // Get's the id of the folder
      let idFolder = 0;                                                             // idFolder = 0 means the root directory
      if(nameFolder != "root"){
        let foundFolder = await Folder.findOne({ where: { nameFolder: nameFolder } }); 
        idFolder = foundFolder.idFolder;
      }

      // From the found users' folders verifies which ones are public and inside the intended folder (idFolder=0 || idFoder = idFolder from the DB)
      let i=0;
      while(i<foldersUserFound.length){
        let folder = await Folder.findOne({where: {idFolder: foldersUserFound[i].idFolderHasUFo, stateFolder: "Public", parentFolder: idFolder}}); 
        if(folder != null){
          publicFoldersUser.push(folder);
        }
        i++;
      }
      ctx.body = publicFoldersUser;
    } catch(e){
      ctx.body = "Something went wrong while getting users' public folder inside of the root or a parent folder."
      console.log(e);
    }
  } else{
    ctx.body = error;
  }

}

// Gets Users' folders
const getUserFolders = async (ctx) => {
  console.log(
    "getUserFolders getUserFolders getUserFolders getUserFolders getUserFolders "
  );
  let idUser = ctx.params.idUser;
  let error = await validationsGetUserFolders(idUser);
  if (error == "") {
    try {
      let foldersUserFound = await UserFolderHas.findAll({
        where: { idUserHasUFo: idUser },
      }); // Gets all the values from the table "userFolder_has" from the userID
      //Will iterate over the values of "userFolder_has" and get the values of "folders" table according to the user id (basically is a shit and slow inner join made on the code, hard coded)
      for (let index = 0; index < foldersUserFound.length; index++) {
        const dbFolderData = await Folder.findAll({
          where: {
            idFolder: foldersUserFound[index].dataValues.idFolderHasUFo,
          },
        });
        //console.log(dbFolderData[0].dataValues.nameFolder)
        foldersUserFound[index].dataValues.folderName =
          dbFolderData[0].dataValues.nameFolder;
        foldersUserFound[index].dataValues.stateFolder =
          dbFolderData[0].dataValues.stateFolder;
        foldersUserFound[index].dataValues.idFolder =
          dbFolderData[0].dataValues.idFolder;
      }
      ctx.body = foldersUserFound;
    } catch (e) {
      ctx.body = "Something went wrong while geting users' folders.";
      console.log(e);
    }
  } else {
    ctx.body = error;
  }
};

//filter folders based on view right
const filterFoldersOnRights = async (foundFolders, user, idUser) => {
  let filteredFolders = []

  //Cycles every files
  for (let index = 0; index < foundFolders.length; index++) {
    //Checks if the user is the owner
    if(foundFolders[index].dataValues.owner == user || foundFolders[index].dataValues.stateFolder == 'Public'){
      filteredFolders.push(foundFolders[index].dataValues);
    }else{
      //If the user is NOT the owner go check on the other table if he has permissions over the file
      let foundSingleFolder = await UserFolderHas.findOne({where: {idFolderHasUFo: foundFolders[index].dataValues.idFolder, idUserHasUFo: idUser}});
      if(foundSingleFolder){
        filteredFolders.push(foundFolders[index].dataValues);
      }else{
        console.log("NULL -> Didn't find any folder");
      }
    }
  }
  return filteredFolders;
}

// Gets a specific folder
const getFolder = async (ctx) => {
  let idFolder = ctx.params.idFolder;
  var erro = await validatesFolderExists(idFolder);
  let error = await permissionsController.validatesIfUserHasFolderPermission(ctx.idUser, idFolder, "View");
  if (erro == "") {
    try {
      let foundFolder = await Folder.findOne({ where: { idFolder: idFolder } });
      if (error == "" || foundFolder.stateFolder == 'Public') {
        ctx.body = foundFolder;
      } else ctx.body = error;
    } catch (e) {
      ctx.body = "Error on accessing the specified folder.";
      console.log(e);
    }
  } else {
    ctx.body = erro;
  }
};

// Gets public folders of root (idFolder = 0) or inside of a certain folder (idFolder = idFolder of the Folders' table)
const getPublicFoldersInside = async (ctx) => {
  let parentFolder = ctx.params.parentFolder;
  let error = await validatesFolderExists(parentFolder);
  if (error == "") {
    try {
      let publicFoldersInside = await Folder.findAll({
        where: { parentFolder: parentFolder, stateFolder: "Public" },
      });
      ctx.body = publicFoldersInside;
    } catch (e) {
      ctx.body =
        "Something went wrong while trying to access the public folders inside of the root/folder.";
      console.log(e);
    }
  } else {
    ctx.body = error;
  }
};

async function validationsPostFolderTo(idUser, nameFolder, parentFolder) {
  let userFound = await User.findOne({ where: { idUser: idUser } }); // See if user exists
  let folderNameFound = await Folder.findOne({
    where: { nameFolder: nameFolder },
  }); // See if ther's already a file with that name
  let parentFolderFound = 0;
  if (parentFolder != 0) {
    // if equals to 0 we are posting to the root
    parentFolderFound = await Folder.findOne({
      where: { idFolder: parentFolder },
    }); // See if folder exists
  }
  let error = "";
  if (userFound == null) {
    error = "User doesn't exist\n";
  }
  if (folderNameFound != null) {
    error += "There is already a file with that name\n";
  }
  if (parentFolder != 0 && parentFolderFound == null) {
    error += "Selected Folder doesn't exist\n";
  }
  return error;
}


async function validationsGetUserFolders(idUser) {
  let userFound = await User.findOne({ where: { idUser: idUser } }); // See if user exists
  let error = "";
  if (userFound == null) {
    error = "User doesn't exist.\n";
  }
  return error;
}

async function validatesFolderExists(idFolder) {
  let foundFolder = await Folder.findOne({ where: { idFolder: idFolder } }); // See if folder exists
  let error = "";
  if (idFolder != 0 && foundFolder == null) {
    error = "Fodler doesn't exist.\n";
  }
  return error;
}

async function validationsGetUserPublicFolders(nameUser, nameFolder){
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
  if(userFound > 1){
    error += "There is more than 1 user with that name. And usernames should be unique \n";
  }
  if(foundFolder > 1 && nameFolder!="root"){
    error += "There is more than 1 folder with that name. And folder names should be unique \n";
  }
  return error;
}

module.exports = {
  postFolderTo,
  updateStateFolder,
  getFoldersFromParent,
  getUserFolders,
  getFolder,
  getPublicFoldersInside,
  getUserPublicFolders,
  updateNameFolder
};

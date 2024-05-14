'use strict';
const { SECRET = "secret", REFRESH_SECRET = "refresh_secret" } = process.env;
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 
const db = require('../models')

// Create main Model
const User = db.users

// Main Work

// Test route
const rootHello = async (ctx) => {
  ctx.body = ctx.user 
}

// Adds a user to the DB. Usernames have to be unique
const signUp = async (ctx) => {  
  try{
    let validInputsErrors = await validateInputSignUp(ctx.request.body.uname, ctx.request.body.password)
    
    if(validInputsErrors == ""){
      let info = {
        uname: ctx.request.body.uname,
        password: await bcrypt.hash(ctx.request.body.password, 10)
      }

      const userCreated = await User.create(info)
      ctx.body = userCreated
    }
    else{
      ctx.body = validInputsErrors
      console.log("validInputsErrors: " + validInputsErrors);
    }  
  }catch(e){
    ctx.body = "Error: Something went wrong with the users' signup"
    console.log(e)
  }
  
};

// Verifies if the user exists on the DB with the incerted password
const login = async (ctx) => {
  let info = {
    uname: ctx.request.body.uname,
    password: ctx.request.body.password,
  }
  try{
    let userFound = await User.findOne({where: {uname: info.uname}});
    if(userFound != null){ 
      const idUser = userFound.idUser
      const samePass = await bcrypt.compare(info.password, userFound.password);
      if(samePass){
        const accessToken = await generateAccessToken(info.uname, idUser);
        const refreshToken = await generateRefreshToken(info.uname, idUser);
        ctx.body = {message: "User Logged In!", accessToken: accessToken, refreshToken: refreshToken, uname: info.uname, idUser: userFound.idUser};
      }
      else{
        ctx.body = {message: "Wrong Password.", accessToken: " ", refreshToken: " ", uname: info.uname};
      }
    }
    else{
      ctx.body = {message: "User does not exist.", accessToken: " ", refreshToken: " ", uname: info.uname};
    }
  }catch(e){
    ctx.body = "Error: Something went wrong with the users' login"
    console.log(e)
  }
};

const refreshUser = async (ctx) => {
  const { authorization } = ctx.headers;

  const refreshToken = authorization.split(" ")[1]; //split the header and get the refresh token

  // If no refresh token is found, return an error
  if (!refreshToken) {
    return ctx.body =  'Refresh token not found'
  }

  try {
    const claims = await jwt.verify(refreshToken, REFRESH_SECRET)
    //if claim does not exist
    if (!claims) {
      ctx.throw(401);
    }
    const accessToken = await generateAccessToken(claims.uname, claims.idUser);

    ctx.body = { accessToken: accessToken };

  }
  catch (err) {
    console.log(err)
    ctx.throw(401);
  }
}

// Function to generate an access token
const generateAccessToken = async (uname, idUser) => {
  const accessToken = await jwt.sign({ uname: uname, idUser: idUser } , SECRET, { expiresIn: '10m' });
  return accessToken;
}

// Function to generate a refresh token
const generateRefreshToken = async (uname, idUser) => {
  const refreshToken = await jwt.sign({ uname: uname, idUser: idUser }, REFRESH_SECRET);
  return refreshToken;
}

// Returns all users from the DB
const getUsers = async (ctx) =>{
  try{
    let users = await User.findAll();
    ctx.body = users;
  }catch(e){
    ctx.body = "Error: Something went wrong while getting all users."
    console.log(e)
  }
}

// Gets a specific user from the DB
const getUser = async (ctx) =>{
  let idUser = ctx.params.idUser;
  try{
    let userFound = await User.findOne({where: {idUser: idUser}});
    if(userFound != null){
      ctx.body = userFound
    }
    else{
      ctx.body = "User doesn't exist."
    }
  }catch(e){
    ctx.body = "Error: Something went wrong while getting the specified user."
    console.log(e)
  }
}


async function validateInputSignUp(uname, password){
  let error = "";

  // Validates if password has a minimum length of 6, if it has upper and lowercase, numbers and special characters
  if(password.length < 6){
    console.log("less than 6");
    error += "Password should have at least 6 characters.\n"
  }
  if(!(/[a-z]/.test(password))){
    console.log("pass");
    error += "Password should have at least 1 Lower case.\n"
  }
  if(!(/[A-Z]/.test(password))){
    console.log("pass2");
    error += "Password should have at least 1 Upper case.\n"
  }
  if(!(/[^a-zA-Z0-9]/.test(password))){
    console.log("pass3");
    error += "Password should have at least 1 special character.\n"
  }
  if(!(/\d/.test(password))){
    console.log("pass4");
    error += "Password should have at least 1 number.\n"
  }

  let user = await User.findOne({where: {uname: uname}});
  if(user != null){
    console.log("pass5");
    error += "Username already reserved. \n"
  }

  return error;
}

module.exports = {
  rootHello,
  signUp,
  login,
  getUsers,
  getUser,
  refreshUser
}

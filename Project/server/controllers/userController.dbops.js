'use strict';
const {SECRET = "secret", REFRESH_SECRET = "refresh_secret"} = process.env;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require('../models')
const permissionsController = require("./permissionController.dbops");

// Create main Model
const User = db.users

// Main Work

// Test route
const rootHello = async (ctx) => {
    ctx.body = ctx.user
}

// Adds a user to the DB. Usernames have to be unique
const signUp = async (ctx) => {
    console.log("chegou")
    console.log(ctx.request.body)
    try {
        //let validInputsErrors = await validateInputSignUp(ctx.request.body.email, ctx.request.body.password)

        //if (validInputsErrors == "") {
        let info = {
            email: ctx.request.body.email,
            password: await bcrypt.hash(ctx.request.body.password, 10),
            first_name: ctx.request.body.first_name,
            last_name: ctx.request.body.last_name,
            age: ctx.request.body.age,
            streak: 1,
            points: 0,
            level: 1,
        }
        console.log(info)
        const userCreated = await User.create(info)
        ctx.body = userCreated
        /*} else {
            ctx.body = validInputsErrors
            console.log("validInputsErrors: " + validInputsErrors);
        }*/
    } catch (e) {
        ctx.body = "Error: Something went wrong with the users' signup"
        console.log(e)
    }

};

// Verifies if the user exists on the DB with the incerted password
const login = async (ctx) => {
    console.log("LOGIN FUNCT")
    let info = {
        email: ctx.request.body.email,
        password: ctx.request.body.password,
    }
    try {
        let userFound = await User.findOne({where: {email: info.email}});
        if (userFound != null) {
            const idUser = userFound.idUser
            const samePass = await bcrypt.compare(info.password, userFound.password);
            if (samePass) {
                const accessToken = await generateAccessToken(info.email, idUser);
                const refreshToken = await generateRefreshToken(info.email, idUser);
                ctx.body = {
                    message: "User Logged In!",
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    email: info.email,
                    idUser: userFound.idUser,
                    first_name: userFound.first_name,
                    last_name: userFound.last_name,
                    age: userFound.age,
                    streak: userFound.streak,
                    points: userFound.points,
                    level: userFound.level
                };
            } else {
                ctx.body = {message: "Wrong Password.", accessToken: " ", refreshToken: " ", email: info.email};
            }
        } else {
            ctx.body = {message: "User does not exist.", accessToken: " ", refreshToken: " ", email: info.email};
        }
    } catch (e) {
        ctx.body = "Error: Something went wrong with the users' login"
        console.log(e)
    }
};

//editar utilizador
const editProfile = async (ctx) => {
    console.log("chegou")
    console.log(ctx.request.body)
    try {
        //let validInputsErrors = await validateInputSignUp(ctx.request.body.email, ctx.request.body.password)

        //if (validInputsErrors == "") {

        if (ctx.request.body.currentPassword != "") {
            console.log("Alterou a password.")
            let info = {
                idUser: ctx.request.body.idUser,
                email: ctx.request.body.email,
                currentPassword: await bcrypt.hash(ctx.request.body.currentPassword, 10),
                newPassword: await bcrypt.hash(ctx.request.body.newPassword, 10),
                first_name: ctx.request.body.first_name,
                last_name: ctx.request.body.last_name,
                age: ctx.request.body.age,
            }


            let userFound = await User.findOne({where: {email: info.email}});
            if (userFound.password == info.currentPassword) {
                console.log(info)
                const userUpdated = await User.update(
                    {
                        email: info.email,
                        password: info.newPassword,
                        first_name: info.first_name,
                        last_name: info.last_name,
                        age: info.age,
                    },
                    {where: {idUser: info.idUser}})

                ctx.body = userUpdated
            } else {
                ctx.body = "Current Password está errada."
            }
        } else {
            console.log("Não alterour password.")
            let info = {
                idUser: ctx.request.body.idUser,
                email: ctx.request.body.email,
                first_name: ctx.request.body.first_name,
                last_name: ctx.request.body.last_name,
                age: ctx.request.body.age,
            }

            const userUpdated = await User.update(
                {
                    email: info.email,
                    first_name: info.first_name,
                    last_name: info.last_name,
                    age: info.age,
                },
                {where: {idUser: info.idUser}})
            ctx.body = userUpdated
        }
    } catch (e) {
        ctx.body = "Error: Something went wrong with the users' signup"
        console.log(e)
    }

};

const refreshUser = async (ctx) => {
    const {authorization} = ctx.headers;

    const refreshToken = authorization.split(" ")[1]; //split the header and get the refresh token

    // If no refresh token is found, return an error
    if (!refreshToken) {
        return ctx.body = 'Refresh token not found'
    }

    try {
        const claims = await jwt.verify(refreshToken, REFRESH_SECRET)
        //if claim does not exist
        if (!claims) {
            ctx.throw(401);
        }
        const accessToken = await generateAccessToken(claims.email, claims.idUser);

        ctx.body = {accessToken: accessToken};

    } catch (err) {
        console.log(err)
        ctx.throw(401);
    }
}

// Function to generate an access token
const generateAccessToken = async (email, idUser) => {
    const accessToken = await jwt.sign({email: email, idUser: idUser}, SECRET, {expiresIn: '10m'});
    return accessToken;
}

// Function to generate a refresh token
const generateRefreshToken = async (email, idUser) => {
    const refreshToken = await jwt.sign({email: email, idUser: idUser}, REFRESH_SECRET);
    return refreshToken;
}

// Returns all users from the DB
const getUsers = async (ctx) => {
    try {
        let users = await User.findAll();
        ctx.body = users;
    } catch (e) {
        ctx.body = "Error: Something went wrong while getting all users."
        console.log(e)
    }
}

// Gets a specific user from the DB
const getUser = async (ctx) => {
    let idUser = ctx.params.idUser;
    try {
        let userFound = await User.findOne({where: {idUser: idUser}});
        if (userFound != null) {
            ctx.body = userFound
        } else {
            ctx.body = "User doesn't exist."
        }
    } catch (e) {
        ctx.body = "Error: Something went wrong while getting the specified user."
        console.log(e)
    }
}


async function validateInputSignUp(email, password) {
    let error = "";

    // Validates if password has a minimum length of 6, if it has upper and lowercase, numbers and special characters
    if (password.length < 6) {
        console.log("less than 6");
        error += "Password should have at least 6 characters.\n"
    }
    if (!(/[a-z]/.test(password))) {
        console.log("pass");
        error += "Password should have at least 1 Lower case.\n"
    }
    if (!(/[A-Z]/.test(password))) {
        console.log("pass2");
        error += "Password should have at least 1 Upper case.\n"
    }
    if (!(/[^a-zA-Z0-9]/.test(password))) {
        console.log("pass3");
        error += "Password should have at least 1 special character.\n"
    }
    if (!(/\d/.test(password))) {
        console.log("pass4");
        error += "Password should have at least 1 number.\n"
    }

    let user = await User.findOne({where: {email: email}});
    if (user != null) {
        console.log("pass5");
        error += "Username already reserved. \n"
    }

    return error;
}


// Updtes User Points when he finishes a game
const updateUserPoints = async (ctx) => {
    let idUser = ctx.params.idUser;
    let points = ctx.request.body.points;
    let level = ctx.request.body.level;

    if (points >= 100) {
        points = 0;
        try {
            const levelUpdated = await User.update(
                {level: level + 1, points: 0},
                {where: {idUser: idUser}}
            );
            ctx.body = "Parabéns subiste de nível! 🚀";
        } catch (e) {
            ctx.body = "Something went wrong when updating the user level.";
            console.log(e);
        }
    } else {
        try {
            const pointsUpdated = await User.update(
                {points: points},
                {where: {idUser: idUser}}
            );
            if (points > 0) {
                ctx.body = "Recebeste " + points + " pontos! Continua assim! 🎆";
            } else {
                ctx.body = "Recebeste 0 pontos! Na próxima certamente vai correr melhor! 🍀";
            }

        } catch (e) {
            ctx.body = "Something went wrong when updating the user points.";
            console.log(e);
        }
    }

}

// Updtes User Days (Streak) when he finishes a game
const updateUserStreak = async (ctx) => {
    let idUser = ctx.params.idUser;
    let streak = ctx.request.body.streak;
    try {
        const streakUpdated = await User.update(
            {streak: streak},
            {where: {idUser: idUser}}
        );
        ctx.body = streakUpdated;
    } catch (e) {
        ctx.body = "Something went wrong when updating the user streak.";
        console.log(e);
    }
}

// Updtes User Level when he finishes a game
const updateUserLevel = async (ctx) => {
    let idUser = ctx.params.idUser;
    let level = ctx.request.body.level;
    try {
        const levelUpdated = await User.update(
            {level: level},
            {where: {idUser: idUser}}
        );
        ctx.body = levelUpdated;
    } catch (e) {
        ctx.body = "Something went wrong when updating the user level.";
        console.log(e);
    }
}


module.exports = {
    rootHello,
    signUp,
    login,
    editProfile,
    getUsers,
    getUser,
    refreshUser,
    updateUserPoints,
    updateUserStreak,
    updateUserLevel
}

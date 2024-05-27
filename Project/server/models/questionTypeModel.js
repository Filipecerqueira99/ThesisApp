module.exports = (sequelize, DataTypes) => {

    const QuestionType = sequelize.define("questiontype", {
        idquestionType:{
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            },
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            },
            unique: true
        }



    })

    return QuestionType
}
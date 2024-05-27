module.exports = (sequelize, DataTypes) => {

    const QuestionCategory = sequelize.define("questioncategory", {
        idquestionCategory:{
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

    return QuestionCategory
}
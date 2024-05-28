module.exports = (sequelize, DataTypes) => {

    const Question = sequelize.define("question", {
        idQuestion:{
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            },
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            },
            unique: true
        },
        answer1:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        answer2:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        answer3:{
            type: DataTypes.STRING,
            allowNull: true,
            validate:{
                notEmpty: true
            }
        },
        answer4:{
            type: DataTypes.STRING,
            allowNull: true,
            validate:{
                notEmpty: true
            }
        },
        correctAnswer:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        explanation:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        tip:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        type_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'questionTypes',
                key: 'idquestionType'
            },
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        category_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'questionCategories',
                key: 'idquestionCategory'
            },
            allowNull: false,
            validate:{
                notEmpty: true
            }
        }


    })

    return Question
}
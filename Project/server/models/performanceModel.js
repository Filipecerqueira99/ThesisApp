module.exports = (sequelize, DataTypes) => {

    const Performance = sequelize.define("performance", {
        idPerformance:{
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            },
        },
        correct_answers:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            },
            unique: true
        },
        wrong_answers:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        category_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'questioncategories',
                key: 'idquestionCategory'
            },
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        user_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'idUser'
            },
            allowNull: false,
            validate:{
                notEmpty: true
            }
        }

    })

    return Performance
}
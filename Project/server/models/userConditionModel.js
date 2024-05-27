module.exports = (sequelize, DataTypes) => {

    const UserCondition = sequelize.define("usercondition", {
        idUserCondition:{
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

    return UserCondition
}
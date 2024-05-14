module.exports = (sequelize, DataTypes) => {

    const UserFolder_Has = sequelize.define("userFolder_has", {
        idUserHasUFo:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        idFolderHasUFo:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        permissionHasUFo:{
            type: DataTypes.STRING,
            defaultValue: "View",
            isIn: [['View', 'Edit']],
            allowNull: false,
            validate:{
                notEmpty: true
            }
        }
    })

    return UserFolder_Has
}
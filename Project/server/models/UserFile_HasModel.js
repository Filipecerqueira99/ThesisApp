module.exports = (sequelize, DataTypes) => {

    const UserFile_Has = sequelize.define("userFile_has", {
        idUserHasUFi:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        idFileHasUFi:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        permissionHasUFi:{
            type: DataTypes.STRING,
            defaultValue: "View",
            isIn: [['View', 'Edit']],
            allowNull: false,
            validate:{
                notEmpty: true
            }
        }
    })

    return UserFile_Has
}
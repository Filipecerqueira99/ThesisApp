module.exports = (sequelize, DataTypes) => {

    const Folder = sequelize.define("folder", {
        idFolder:{
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        parentFolder:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        nameFolder:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            },
            unique: true
        },
        stateFolder:{
            type: DataTypes.STRING,
            defaultValue: "Public",
            isIn: [['Public', 'Private']],
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        owner:{
            type: DataTypes.STRING,
            references: {
                model: 'users',
                key: 'uname'
            },
            allowNull: false,
            validate:{
                notEmpty: true
            }
        }
    })

    return Folder;
}
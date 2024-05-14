module.exports = (sequelize, DataTypes) => {

    const File = sequelize.define("file", {
        idFile:{
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        idFolder:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        nameFile:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            },
            unique: true            
        },
        contentFile:{
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false,
            unique: false            
        },
        stateFile:{
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

    return File;
}
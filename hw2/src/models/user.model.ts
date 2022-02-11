import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../data-access/sequelize';

export class UserModel extends Model{
}

UserModel.init(
    {
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'UserModel',
        tableName: 'users',
        createdAt: false,
        updatedAt: false
    }
);

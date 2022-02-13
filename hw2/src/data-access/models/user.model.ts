import { DataTypes,Model } from 'sequelize';
import { sequelize } from '../sequelize';
import { User } from '../../types/user';
import { UserGroupModel } from './user-group.model';

export class UserModel extends Model implements User {
    age: number;
    id: string;
    login: string;
    password: string;
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
            unique: true,
            onDelete: 'CASCADE',
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

UserGroupModel.belongsTo(UserModel, { foreignKey: 'user_id', targetKey: 'id' });

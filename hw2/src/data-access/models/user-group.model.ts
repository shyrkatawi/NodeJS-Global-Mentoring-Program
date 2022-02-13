import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

export class UserGroupModel extends Model {
    user_id: string;
    group_id: string;
}

UserGroupModel.init(
    {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            onDelete: 'CASCADE',
        },
        group_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            onDelete: 'CASCADE',
        }
    },
    {
        sequelize,
        modelName: 'UserGroupModel',
        tableName: 'user_group',
        createdAt: false,
        updatedAt: false
    }
);

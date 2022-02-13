import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';
import { Group } from '../../types/group';
import { Permission } from 'src/types/permission';
import { UserGroupModel } from './user-group.model';

export class GroupModel extends Model implements Group {
    id: string;
    name: string;
    permissions: Permission[];
}

GroupModel.init(
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true,
            onDelete: 'CASCADE',
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'GroupModel',
        tableName: 'groups',
        createdAt: false,
        updatedAt: false
    }
);

UserGroupModel.belongsTo(GroupModel, { foreignKey: 'group_id', targetKey: 'id' });

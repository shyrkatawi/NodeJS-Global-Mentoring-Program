import { DataTypes, Model, Op } from 'sequelize';
import { sequelize } from '../sequelize';
import { RequestUserDto, User } from '../../types/user';

export class UserModel extends Model {
    async clearAllData(): Promise<void> {
        await UserModel.sync({ force: true });
    }

    async create(user: User): Promise<UserModel> {
        return UserModel.create({ ...user });
    }

    async deleteUserById(id: string): Promise<[number, UserModel[]]> {
        return UserModel.update(
            { isDeleted: true },
            { where: { id: id } }
        );
    }

    async getAutoSuggestUsers(limit: number, loginSubstring: string): Promise<UserModel[]> {
        return UserModel.findAll({
            where: {
                login: {
                    [Op.like]: `%${loginSubstring}%`
                }
            },
            limit: limit
        });
    }

    async getUserById(id: string): Promise<UserModel> {
        return UserModel.findOne(
            { where: { id: id } }
        );
    }

    async getUsers(): Promise<UserModel[]> {
        return UserModel.findAll();
    }

    async updateUserById(id: string, requestUserDto: RequestUserDto): Promise<[number, UserModel[]]> {
        return UserModel.update(
            { ...requestUserDto },
            { where: { id: id } }
        );
    }
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

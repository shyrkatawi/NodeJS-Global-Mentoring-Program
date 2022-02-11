import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { RequestAutoSuggestUsersDto, RequestUserDto, User } from '../types/user';
import { UserModel } from '../models/user.model';
import { Op } from 'sequelize';

class UsersService {
    async addUser(user: User): Promise<User> {
        const dbResponse = await UserModel.create({ ...user });
        return dbResponse['dataValues'];
    }

    async clearStorage() {
        await UserModel.sync({ force: true });
    }

    async deleteUserById(id: string): Promise<string> {
        const dbResponse = await UserModel.update(
            { isDeleted: true },
            { where: { id: id } }
        );
        const numberOfUpdatedRows = dbResponse[0];
        if (numberOfUpdatedRows === 0) {
            throw new UserNotFoundException(id);
        }
        return `User with id ${id} was deleted`;
    }

    async getAutoSuggestUsers(requestAutoSuggestUsersDto: RequestAutoSuggestUsersDto): Promise<User[]> {
        let { limit, loginSubstring } = requestAutoSuggestUsersDto;
        const dbResponse = await UserModel.findAll({
            where: {
                login: {
                    [Op.like]: `%${loginSubstring}%`
                }
            },
            limit: limit
        });
        return dbResponse.map(e => e['dataValues']);
    }

    async getUserById(id: string): Promise<User> {
        const dbResponse = await UserModel.findOne(
            { where: { id: id } }
        );
        if (!dbResponse) {
            throw new UserNotFoundException(id);
        }
        return dbResponse['dataValues'];
    }

    async getUsers(): Promise<User[]> {
        const dbResponse = await UserModel.findAll();
        return dbResponse.map(e => e['dataValues']);
    }

    async updateUser(id: string, requestUserDto: RequestUserDto): Promise<string> {
        const dbResponse = await UserModel.update(
            { ...requestUserDto },
            { where: { id: id } }
        );
        const numberOfUpdatedRows = dbResponse[0];
        if (numberOfUpdatedRows === 0) {
            throw new UserNotFoundException(id);
        }
        return `User with id ${id} was updated`;
    }
}

export const usersService = new UsersService();
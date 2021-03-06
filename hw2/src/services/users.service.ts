import { NotFoundException } from '../exceptions/not-found.exception';
import { RequestAutoSuggestUsersDto, RequestUserDto, User } from '../types/user';
import { UserModel } from '../data-access/models/user.model';
import { Op } from 'sequelize';

class UsersService {
    async addUser(user: User): Promise<string> {
        const dbResponse = await UserModel.create({ ...user });
        const createdUser = dbResponse['dataValues'];
        return `User with id ${createdUser.id} was created`;
    }

    async clearStorage() {
        await UserModel.sync({ force: true });
    }

    async deleteUserById(id: string): Promise<string> {
        const deletedUsers = await UserModel.destroy(
            { where: { id: id } }
        );
        if (deletedUsers === 0) {
            throw new NotFoundException(`Can not find user with id "${id}`);
        }
        return `User with id ${id} was deleted`;
    }

    async getAutoSuggestUsers(requestAutoSuggestUsersDto: RequestAutoSuggestUsersDto): Promise<User[]> {
        let { limit, loginSubstring } = requestAutoSuggestUsersDto;
        const dbResponse = await UserModel
            .scope('withoutPassword')
            .findAll({
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
        const dbResponse = await UserModel
            .scope('withoutPassword')
            .findOne(
                { where: { id: id } }
            );
        if (!dbResponse) {
            throw new NotFoundException(`Can not find user with id "${id}`);
        }
        return dbResponse['dataValues'];
    }

    async getUsers(): Promise<User[]> {
        const dbResponse = await UserModel
            .scope('withoutPassword')
            .findAll();
        return dbResponse.map(e => e['dataValues']);
    }

    async updateUser(id: string, requestUserDto: RequestUserDto): Promise<string> {
        const dbResponse = await UserModel.update(
            { ...requestUserDto },
            { where: { id: id } }
        );
        const numberOfUpdatedRows = dbResponse[0];
        if (numberOfUpdatedRows === 0) {
            throw new NotFoundException(`Can not find user with id "${id}`);
        }
        return `User with id ${id} was updated`;
    }
}

export const usersService = new UsersService();
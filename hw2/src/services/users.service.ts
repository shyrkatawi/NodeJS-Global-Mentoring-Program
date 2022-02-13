import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { RequestAutoSuggestUsersDto, RequestUserDto, User } from '../types/user';
import { db } from '../data-access/db';

class UsersService {
    async addUser(user: User): Promise<User> {
        const dbResponse = await db.userModel.create(user);
        return dbResponse['dataValues'];
    }

    async clearStorage() {
        await db.userModel.clearAllData();
    }

    async deleteUserById(id: string): Promise<string> {
        const dbResponse = db.userModel.deleteUserById(id);
        const numberOfUpdatedRows = dbResponse[0];
        if (numberOfUpdatedRows === 0) {
            throw new UserNotFoundException(id);
        }
        return `User with id ${id} was deleted`;
    }

    async getAutoSuggestUsers(requestAutoSuggestUsersDto: RequestAutoSuggestUsersDto): Promise<User[]> {
        let { limit, loginSubstring } = requestAutoSuggestUsersDto;
        const dbResponse = await db.userModel.getAutoSuggestUsers(limit, loginSubstring);
        return dbResponse.map(e => e['dataValues']);
    }

    async getUserById(id: string): Promise<User> {
        const dbResponse = await db.userModel.getUserById(id);
        if (!dbResponse) {
            throw new UserNotFoundException(id);
        }
        return dbResponse['dataValues'];
    }

    async getUsers(): Promise<User[]> {
        const dbResponse = await db.userModel.getUsers();
        return dbResponse.map(e => e['dataValues']);
    }

    async updateUser(id: string, requestUserDto: RequestUserDto): Promise<string> {
        const dbResponse = await db.userModel.updateUserById(id, requestUserDto);
        const numberOfUpdatedRows = dbResponse[0];
        if (numberOfUpdatedRows === 0) {
            throw new UserNotFoundException(id);
        }
        return `User with id ${id} was updated`;
    }
}

export const usersService = new UsersService();
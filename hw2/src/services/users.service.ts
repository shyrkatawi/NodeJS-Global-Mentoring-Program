import { userStorage } from '../storages/users.storage';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { RequestAutoSuggestUsersDto, RequestUserDto, User } from '../types/user';

class UsersService {
    async addUser(user: User): Promise<User> {
        userStorage[user.id] = user;
        return user;
    }

    async clearStorage() {
        for (const key in userStorage) {
            delete userStorage[key];
        }
    }

    async deleteUserById(id: string): Promise<User> {
        const user = await this.getUserById(id);
        user.isDeleted = true;
        return user;
    }

    async getAutoSuggestUsers(requestAutoSuggestUsersDto: RequestAutoSuggestUsersDto): Promise<User[]> {
        let { limit, loginSubstring } = requestAutoSuggestUsersDto;
        const users: User[] = await this.getUsers();
        const suggestUsers: User[] = [];
        for (const user of users) {
            if (limit <= 0) {
                return suggestUsers;
            }
            if (user.login.includes(loginSubstring)) {
                suggestUsers.push(user);
                limit--;
            }
        }
        return suggestUsers;
    }

    async getUserById(id: string): Promise<User> {
        const user = userStorage[id];
        if (!user) {
            throw new UserNotFoundException(id);
        }
        return user;
    }

    async getUsers(): Promise<User[]> {
        return Object.values(userStorage);
    }

    async updateUser(id: string, requestUserDto: RequestUserDto): Promise<User> {
        const user = await this.getUserById(id);
        user.login = requestUserDto.login;
        user.password = requestUserDto.password;
        user.age = requestUserDto.age;
        return user;
    }
}

export const usersService = new UsersService();
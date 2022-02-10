import { v4 as uuidv4 } from 'uuid';

export class User {
    age: number;
    id: string;
    isDeleted: boolean = false;
    login: string;
    password: string;

    constructor(requestUserDto: RequestUserDto) {
        this.id = uuidv4();
        this.login = requestUserDto.login;
        this.password = requestUserDto.password;
        this.age = requestUserDto.age;
    }
}

export interface RequestUserDto {
    age: number;
    login: string;
    password: string;
}

export interface RequestAutoSuggestUsersDto {
    loginSubstring: string;
    limit: number;
}
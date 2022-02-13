import { v4 as uuidv4 } from 'uuid';

export class User {
    age: number;
    id: string;
    login: string;
    password: string;

    constructor(age: number, login: string, password: string) {
        this.age = age;
        this.id = uuidv4();
        this.login = login;
        this.password = password;
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
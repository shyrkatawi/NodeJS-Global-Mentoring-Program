import { User } from '../types/user';

interface Storage<T> {
    [id: string]: T;
}

export const userStorage: Storage<User> = {};
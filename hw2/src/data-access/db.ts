import { UserModel } from './models/user.model';

class Db {
    userModel = new UserModel();
}

export const db = new Db();
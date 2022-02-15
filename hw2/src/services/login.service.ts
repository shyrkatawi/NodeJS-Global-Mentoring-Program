import { User } from '../types/user';
import { UserModel } from '../data-access/models/user.model';
import { NotFoundException } from '../exceptions/not-found.exception';
import jwt from 'jsonwebtoken';

class LoginService {
    async login(login: string, password: string): Promise<string> {
        const dbResponse: UserModel = await UserModel.findOne(
            {
                where: {
                    login: login,
                    password: password
                }
            }
        );
        if (!dbResponse) {
            throw new NotFoundException(`wrong login/password pair`);
        }
        const user: User = dbResponse['dataValues'];
        return generateToken(user);
    }
}

const generateToken = (user: User): string => {
    return jwt.sign(
        { user_id: user.id },
        process.env.TOKEN_KEY,
        { expiresIn: process.env.TOKEN_EXPIRES_IN }
    );
};

export const loginService = new LoginService();
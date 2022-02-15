import express from 'express';
import { loginService } from '../services/login.service';
import { validateBodySchema } from '../middlewares/validation.middleware';
import { loginScheme } from '../schemes/user.scheme';
import { LoginUserDto } from '../types/user';

const loginRouter = express.Router();

// get all groups
loginRouter.get('/',
    validateBodySchema(loginScheme),
    async (req, res, next) => {
        try {
            const loginUserDto: LoginUserDto = req.body;
            const { login, password }: { login: string, password: string } = loginUserDto;
            const token = {
                token: await loginService.login(login, password)
            };
            res.send(token);
        } catch (error) {
            next(error);
        }
    }
);

export { loginRouter };
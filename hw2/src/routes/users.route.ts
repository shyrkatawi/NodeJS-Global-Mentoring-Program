import express from 'express';
import { usersService } from '../services/users.service';
import { RequestAutoSuggestUsersDto, RequestUserDto, User } from '../types/user';
import { getAutoSuggestUsersScheme, requestUserScheme } from './schemes/user.scheme';
import { validateBodySchema, validateIdInParams } from '../middlewares/validation.middleware';

const usersRouter = express.Router();

// get all users
usersRouter.get('/',
    async (req, res) => {
        const allUsersFromDB: User[] = await usersService.getUsers();
        res.send(allUsersFromDB);
    }
);

// get user by uuid
usersRouter.get('/id/:id',
    validateIdInParams(),
    async (req, res, next) => {
        try {
            const id: string = req.params.id;
            const user: User = await usersService.getUserById(id);
            res.send(user);
        } catch (error) {
            next(error);
        }
    }
);

// get auto-suggest list from limit users, sorted by login property and filtered by loginSubstring in the login property
usersRouter.get('/autoSuggestUsers',
    validateBodySchema(getAutoSuggestUsersScheme),
    async (req, res) => {
        const requestAutoSuggestUsersDto: RequestAutoSuggestUsersDto = req.body;
        const autoSuggestUsers: User[] = await usersService.getAutoSuggestUsers(requestAutoSuggestUsersDto);
        res.send(autoSuggestUsers);
    }
);

// add user
usersRouter.post('/',
    validateBodySchema(requestUserScheme),
    async (req, res, next) => {
        try {
            const requestUserDto: RequestUserDto = req.body;
            const user: User = new User(requestUserDto);
            const createdUser: User = await usersService.addUser(user);
            res.send(createdUser);
        } catch (error) {
            next(error);
        }
    }
);

// update user
usersRouter.put('/id/:id',
    validateIdInParams(),
    validateBodySchema(requestUserScheme),
    async (req, res, next) => {
        try {
            const id: string = req.params.id;
            const requestUserDto: RequestUserDto = req.body;
            const updatedUser: User = await usersService.updateUser(id, requestUserDto);
            res.send(updatedUser);
        } catch (error) {
            next(error);
        }
    }
);

// soft delete user by uuid
usersRouter.delete('/id/:id',
    validateIdInParams(),
    async (req, res, next) => {
        try {
            const id: string = req.params.id;
            const deletedUser: User = await usersService.deleteUserById(id);
            res.send(deletedUser);
        } catch (error) {
            next(error);
        }
    }
);

// remove all users from storage
usersRouter.get('/clearStorage', async (req, res) => {
    await usersService.clearStorage();
    res.send('Storage has been cleared!');
});

export { usersRouter };
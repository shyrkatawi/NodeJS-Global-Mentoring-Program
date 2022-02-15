import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { sequelize } from './data-access/sequelize';

import { groupsRouter } from './routes/group.route';
import { loginRouter } from './routes/login.route';
import { usersRouter } from './routes/users.route';

import { GroupModel } from './data-access/models/group.model';
import { UserModel } from './data-access/models/user.model';
import { UserGroupModel } from './data-access/models/user-group.model';

import { User } from './types/user';
import { usersService } from './services/users.service';

import { authenticateToken } from './middlewares/authenticate.middleware';
import { handleErrorFromDB, handleException, handleOtherErrors } from './middlewares/error-handling.middleware';
import { logErrorInfo, logRequestInfo } from './middlewares/logger.middleware';


export const app = express();
const PORT = process.env.PORT;

app.disable('x-powered-by');
app.disable('etag');
app.use(express.json());

app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.use(logRequestInfo);

app.use('/login', loginRouter);
app.use(authenticateToken);

app.use('/users', usersRouter);
app.use('/groups', groupsRouter);

app.use(logErrorInfo);
app.use(handleErrorFromDB);
app.use(handleException);
app.use(handleOtherErrors);
process.on('uncaughtException', handleOtherErrors);

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await db_test();
        console.log(`Listening at http://localhost:${PORT}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});

async function db_test() {
    await UserModel.sequelize.sync({ force: true });
    await GroupModel.sequelize.sync({ force: true });
    await UserGroupModel.sequelize.sync({ force: true });
    const user: User = new User(12, 'test_login', 'test_password1');
    const message = await usersService.addUser(user);
    console.log(message);
}
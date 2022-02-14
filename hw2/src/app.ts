import 'dotenv/config';
import express from 'express';
import { sequelize } from './data-access/sequelize';

import { usersRouter } from './routes/users.route';
import { groupsRouter } from './routes/group.route';

import { UserModel } from './data-access/models/user.model';
import { GroupModel } from './data-access/models/group.model';
import { UserGroupModel } from './data-access/models/user-group.model';
import { handleErrorFromDB, handleException, handleOtherErrors } from './middlewares/error-handling.middleware';
import { logErrorInfo, logRequestInfo } from './middlewares/logger.middleware';

export const app = express();
const PORT = process.env.PORT;

app.disable('x-powered-by');
app.disable('etag');

app.use(express.json());

app.use(logRequestInfo);
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
        await UserModel.sequelize.sync({ force: true });
        await GroupModel.sequelize.sync({ force: true });
        await UserGroupModel.sequelize.sync({ force: true });
        console.log(`Listening at http://localhost:${PORT}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});

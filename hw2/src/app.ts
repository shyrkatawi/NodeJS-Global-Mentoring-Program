import 'dotenv/config';
import express from 'express';
import { sequelize } from './data-access/sequelize';
import { StatusCodes } from 'http-status-codes';

import { usersRouter } from './routes/users.route';
import { groupsRouter } from './routes/group.route';

import { UserModel } from './data-access/models/user.model';
import { GroupModel } from './data-access/models/group.model';
import { UserGroupModel } from './data-access/models/user-group.model';

export const app = express();
const PORT = process.env.PORT;

app.disable('x-powered-by');
app.disable('etag');

app.use(express.json());
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

    let errorMessage;
    if (err.original?.detail) {
        console.log(err.original.detail);
        errorMessage = `ERROR: ${err.original.detail}`;
    } else if (err.message) {
        errorMessage = `ERROR: ${err.message}`;
    } else {
        errorMessage = `ERROR: unexpected server error`;
    }

    res.status(statusCode);
    res.send(errorMessage);
    next();
});

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

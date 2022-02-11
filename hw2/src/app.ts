import express from 'express';
import { usersRouter } from './routes/users.route';
import { StatusCodes } from 'http-status-codes';
import { sequelize } from './data-access/sequelize';
import { UserModel } from './models/user.model';
import 'dotenv/config';

export const app = express();
const PORT = process.env.PORT;

app.disable('x-powered-by');
app.disable('etag');

app.use(express.json());
app.use('/users', usersRouter);

app.use((err, req, res, next) => {
    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
    res.send(err.message || 'Server error');
    next();
});

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await UserModel.sync({ force: true }); // i understand how { force: true } works
        console.log(`Listening at http://localhost:${PORT}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});

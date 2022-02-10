import express from 'express';
import { usersRouter } from './routes/users.route';
import { StatusCodes } from 'http-status-codes';

export const app = express();
const PORT = 3000;

app.disable('x-powered-by');
app.disable('etag');

app.use(express.json());
app.use('/users', usersRouter);

app.use((err, req, res, next) => {
    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
    res.send(err.message || 'Server error');
    next();
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});

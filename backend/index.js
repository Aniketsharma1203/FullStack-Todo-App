import express from 'express';
import cors from 'cors';
import { connectToMongoDb } from './connect.js';
import userRoute from './routes/user.js'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import loggedInrouter from './routes/loggedInUser.js';
import todoRouter  from './routes/todos.js';

const app = express();
app.use(cors());
const PORT = 4000;
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(bodyParser.json());

connectToMongoDb("mongodb://127.0.0.1:27017/login-demo")
    .then(() => console.log("MongoDB Connected."))

app.use('/', userRoute);
app.use('/user', loggedInrouter);
app.use('/todo', todoRouter);

app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors ({
    origin: process.env.CORS_ORIGIN,        // we use cors to allow our application to handle requests and responses from the patricular url only not any other because our application needs multiple resource acces to run.
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))     //we use url encoded to handle the url like we search on google hitesh coddhary here the spacebetween is replaced with encoded symboles or texts like + %20 etc.
app.use(express.static("public"))       //we use this for if we want to store any files like pdf video images etc. then we use here public folder to store that data..
app.use(cookieParser())

// routes..
import userRouter from './routes/user_routes.js';

// routes declaration..
app.use("/api/v1/users", userRouter);


export default app
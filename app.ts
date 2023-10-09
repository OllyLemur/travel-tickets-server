import express from "express";
import cors from "cors";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";


import userRouter from "./src/routes/userRoutes";
import flightsRouter from "./src/routes/flightsRoutes";
import morgan from "morgan";



const app = express();

app.use(express.json());
app.use(morgan('dev'))
app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'supersecret',
    cookie: {
      httpOnly: false,
      secure: false,
    },
  }));
  
  app.use("/api/v1/users", userRouter);
app.use("/api/vi/flights", flightsRouter);



export default app;
//backend/src/app.js
import express from 'express';
import cors from 'cors';
import helmet from "helmet";
import cookieParser from 'cookie-parser';
import morgan from "morgan";
import compression from "compression";
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import config from "./config/config.js";

const app = express();

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    const allowed = [config.FRONTEND_URL, "http://127.0.0.1:5173"];
    return cb(null, allowed.includes(origin));
  },
  credentials: true,
};


// CORS: allow only trusted frontend(s).
//Locked down to FRONTEND_URL (instead of allowing anyone).
// Change in .env for different environments (development, staging, production)

//allows cors globally(preflight and regualr requests)
app.use(cors(corsOptions));

//ensure OPTIONS pre-flight responds quickly
//app.options("*", cors(corsOptions));

// GLOBAL MIDDLEWARES
app.use(helmet()); // adds security headers (XSS, Clickjacking, MIME sniffing protection).
app.use(express.json({ limit: "10kb" })); //GLOBAL JSON parser for most routes. Prevent/blocks large/huge payloads attacks
app.use(cookieParser()); // Enable httpOnly,Secure, SameSite refresh tokens
app.use(compression()); // reduces payload size Gzip compression for responses
app.use(morgan(config.NODE_ENV === "production" ? "combined" : "dev")); //in prod -logs IPs, request method,
//  response codes/status, user agent etc. for better analysis.
// logging. In local/dev, use 'dev' format. In production, use 'combined'.


/*app.use(
  cors({
    origin: process.env.FRONTEND_URL ||  "http://localhost:5173",
    credentials: true,
  })
);*/

//app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'CivicHub API' });
});

//app.use(cors());

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
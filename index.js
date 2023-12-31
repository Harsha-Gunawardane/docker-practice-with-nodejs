const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const connectRedis = require("connect-redis"); // Import connect-redis separately
const RedisStore = connectRedis(session);
const redis = require("redis");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");

const postRouter = require("./routes/post");
const userRouter = require("./routes/user");

const app = express();
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connected"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

const redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 30000,
    },
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<H2>Hello docker....</H2>");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/posts", postRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Listen on port " + port));

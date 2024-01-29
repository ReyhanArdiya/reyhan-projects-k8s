import "dotenv/config";
import MongoStore from "connect-mongo";
import User from "./models/user.js";
import authRouter from "./routers/auth.js";
import ejsEngine from "ejs-mate";
import errHandlers from "./utils/error-handlers.js";
import express from "express";
import { fileURLToPath } from "url";
import flash from "connect-flash";
import helmet from "helmet";
import homeRouter from "./routers/home.js";
import methodOverride from "method-override";
import mongoSanitize from "express-mongo-sanitize";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import songsRouter from "./routers/songs.js";
import userRouter from "./routers/user.js";
import { addLocalVariables, requestLogger } from "./utils/middleware.js";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Mongoose stuff
const mongoDatabase = process.env.MONGODB;
const mongoUrl = process.env.MONGO_URL;

try {
	await mongoose.connect(mongoUrl);
	console.log(`Connected to ${mongoDatabase}!🍃`);
} catch (err) {
	console.log(`Error! Can't connect to ${mongoDatabase}!🍂`, err);
}

// Express stuff
const port = process.env.PORT;
const app = express();

app.use(
	helmet({
		crossOriginEmbedderPolicy : false,
		frameguard                : false
	})
);
app.use(
	helmet.contentSecurityPolicy({
		directives : {
			connectSrc : [ "'self'" ],
			defaultSrc : [ "self" ],
			fontSrc    : [ "'self'", "https://fonts.gstatic.com/" ],
			imgSrc     : [
				"'self'",
				"blob:",
				"data:",
				"http:",
				`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/`,
				"https://images.unsplash.com/",
				"https://e-cdn-images.dzcdn.net/",
				"https://e-cdns-images.dzcdn.net/images/",
				"http://e-cdn-images.dzcdn.net/",
				"http://e-cdns-images.dzcdn.net/images/",
				"https://i.scdn.co/image/",
				"https://placekitten.com/",
				"http://i.scdn.co/image/",
				"http://placekitten.com/"
			],
			mediaSrc  : [ "'self'", "blob:", "http:", "https:" ],
			scriptSrc : [
				"'unsafe-inline'",
				"'self'",
				"https://cdn.jsdelivr.net/",
				"http://cdn.jsdelivr.net/",
				"https://unpkg.com/"
			],
			styleSrc  : [ "'self'", "'unsafe-inline'", "https://fonts.googleapis.com/" ],
			workerSrc : [ "'self'", "blob:" ]
		},
		useDefaults : false
	})
);

app.set("view engine", "ejs");
app.engine("ejs", ejsEngine);
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "public")));

app.use(
	session({
		cookie : {
			expires  : Date.now() + 1000 * 60 * 60 * 24 * 7,
			httpOnly : true,
			// secure: true,
			maxAge   : 1000 * 60 * 60 * 24 * 7
		},
		name              : process.env.SESSION_NAME || "connect.sid",
		resave            : false,
		saveUninitialized : true,
		secret            : process.env.SESSION_SECRET,
		store             : MongoStore.create({
			mongoUrl,
			touchAfter : 24 * 60 * 60
		})
	})
);
app.use(mongoSanitize({ replaceWith : "_" }));

app.use(methodOverride("_method"));
app.use(flash());

// Passport stuff
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Setup app middlewares
app.use(addLocalVariables, requestLogger);

// Using routers
app.use("/", homeRouter);
app.use("/songs", songsRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);

// Error handlers
app.all("*", errHandlers.handleNotFound);

app.use(
	errHandlers.handleSameUser,
	errHandlers.handleCastError,
	errHandlers.handleNoSong,
	errHandlers.handleAnyError
);

app.listen(port, () => console.log(`Listening on 🚢 ${port} (●'◡'●)`));

// TODO make basic express project template once all is set

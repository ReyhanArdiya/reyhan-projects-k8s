import Song from "../models/song.js";
import mongoose from "mongoose";

const mongoDatabase = "VIXUNDB";
try {
	await mongoose.connect(`mongodb://localhost:27017/${mongoDatabase}`);
	console.log(`Connected to ${mongoDatabase}!🍃`);
} catch (err) {
	console.log(
		`Error! Can't connect to ${mongoDatabase}!🍂`,
		err
	);
}

await Song.deleteMany({});

await Song.insertMany([
	{
		album    : "Bloom",
		artist   : "Beach House",
		coverURL : "url",
		title    : "The Hours",
		year     : 2011,
	},
	{
		album    : "Bloom",
		artist   : "Beach House",
		coverURL : "url",
		title    : "Peoples",
		year     : 2011,
	},
	{
		album    : "Depression Cherry",
		artist   : "Beach House",
		coverURL : "url",
		title    : "Beyond Love",
		year     : 2015,
	},
	{
		album    : "Depression Cherry",
		artist   : "Beach House",
		coverURL : "url",
		title    : "Space Song",
		year     : 2015,
	},
	{
		album    : "Teenage Dreams",
		artist   : "Beach House",
		coverURL : "url",
		title    : "Used to Be",
		year     : 2009,
	},
	{
		album    : "Thank your lucky stars",
		artist   : "Beach House",
		coverURL : "url",
		title    : "Elegy to the Void",
		year     : 2015,
	},
	{
		album    : "Chromatica",
		artist   : "Lady Gaga",
		coverURL : "url",
		title    : "911",
		year     : 2020,
	},
	{
		album    : "The Fame Monster",
		artist   : "Lady Gaga",
		coverURL : "url",
		title    : "Alejandor",
		year     : 2009,
	},
	{
		album    : "Born this Way",
		artist   : "Lady Gaga",
		coverURL : "url",
		title    : "Government Hooker",
		year     : 2012,
	},
	{
		album    : "Chromatica",
		artist   : "Lady Gaga",
		coverURL : "url",
		title    : "Replay",
		year     : 2020,
	},
	{
		album    : "Chromatica",
		artist   : "Lady Gaga",
		coverURL : "url",
		title    : "Alice",
		year     : 2020,
	},
	{
		album    : "Once Twice Melody",
		artist   : "Beach House",
		coverURL : "url",
		title    : "Superstar",
		year     : 2022,
	},
]);

console.log("Done seeding!");
mongoose.connection.close();
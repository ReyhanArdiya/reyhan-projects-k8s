import Song from "./song.js";
import User from "./user.js";
import mongoose from "mongoose";

/**
 * Type for instance of {@link Comment}.
 *
 * @typedef {import("mongoose").Document & {
 * song: import("./song.js").SongDocument
 * text: string
 * user: import("./user.js").UserDocument
 * }} CommentDocument
 */
const CommentSchema = new mongoose.Schema({
	song : {
		ref      : "Song",
		required : true,
		type     : mongoose.Schema.Types.ObjectId,
	},
	text : {
		required : true,
		type     : String
	},
	user : {
		ref      : "User",
		required : true,
		type     : mongoose.Schema.Types.ObjectId
	},
}, { strict : "throw" });

CommentSchema.post("save", async function(comment) {
	await Song.findByIdAndUpdate(
		comment.song,
		{ $push : { comments : comment } }
	);
	await User.findByIdAndUpdate(
		comment.user,
		{ $push : { comments : comment } }
	);
});

CommentSchema.post("findOneAndDelete", async function(comment) {
	await Song.findByIdAndUpdate(
		comment.song._id,
		{ $pull : { comments : comment._id } }
	);
	await User.findByIdAndUpdate(
		comment.user._id,
		{ $pull : { comments : comment._id } }
	);
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
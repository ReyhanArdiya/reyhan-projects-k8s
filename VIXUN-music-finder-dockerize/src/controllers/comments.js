import Comment from "../models/comment.js";
import Song from "../models/song.js";
import sanitizeHtml from "../utils/sanitize-html.js";

const isSameUser = async (req, res, next) => {
	try {
		const comment = await Comment.findById(req.params.commentId);
		comment.user.equals(req.user._id) ? next() : res.redirect("/auth/login");
	} catch (err) {
		next(err);
	}
};

const createComment = async (req, res, next) => {
	try {
		let { text = "" } = req.body;
		text = sanitizeHtml(text);

		const song = await Song.findById(req.params.id);
		const newComment = new Comment({
			song,
			text,
			user : req.user,
		});
		res.send(await newComment.save());
	} catch (err) {
		next(err);
	}
};

const deleteComment = async (req, res, next) => {
	try {
		await Comment.findByIdAndDelete(req.params.commentId);
		res.end();
	} catch (err) {
		next(err);
	}
};

const updateComment = async (req, res, next) => {
	try {
		let { text } = req.body;
		text = sanitizeHtml(text);

		const comment = await Comment.findByIdAndUpdate(
			req.params.commentId,
			{ text },
			{ new : true }
		);
		res.send(comment);
	} catch (err) {
		next(err);
	}
};

const commentsController = {
	createComment,
	deleteComment,
	isSameUser,
	updateComment
};

export default commentsController;
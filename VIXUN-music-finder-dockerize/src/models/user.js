import Comment from "./comment.js";
import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
	comments : [ {
		ref  : "Comment",
		type : mongoose.Schema.Types.ObjectId
	} ],
	email : {
		required : true,
		type     : String
	},
	favorites : [ {
		ref  : "Song",
		type : mongoose.Schema.Types.ObjectId
	} ],
	isAdmin : Boolean,
	profile : {
		filename : String,
		path     : {
			default : "http://placekitten.com/250/250",
			type    : String
		}

	}
}, { strict : "throw" });

UserSchema.plugin(passportLocalMongoose, { usernameQueryFields : [ "email" ] });

UserSchema.post("findOneAndDelete", async function(user) {
	for (const comment of user.comments) {
		await Comment.findByIdAndDelete(comment);
	}
});

const User = mongoose.model("User", UserSchema);

export default User;
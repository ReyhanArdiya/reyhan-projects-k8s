import User from "../models/user.js";
import sanitizeHtml from "../utils/sanitize-html.js";

const renderRegister = (req, res) => {
	const err = req.flash("error");
	res.render("auth/register", { err });
};

const renderLogin = (req, res) => {
	const err = req.flash("error");
	res.render("auth/login", { err });
};

const registerUser = async (req, res, next) => {
	try {
		let { email, password, username } = req.body;
		email = sanitizeHtml(email);
		password = sanitizeHtml(password);
		username = sanitizeHtml(username);

		const user = new User({
			email,
			username,
		});
		const newUser = await User.register(user, password);

		req.login(newUser, err => err && console.error(err));
		res.redirect("/");
	} catch (err) {
		next(err);
	}
};

const logout = (req, res) => {
	delete req.session.lastVisited;
	req.logout();
	res.redirect("/");
};

const sendCurrentUser = (req, res) => {
	if (!req.user) {
		res.send(false);
	} else {
		const { _id, username, email } = req.user;
		res.send({
			_id,
			email,
			username,
		});
	}
};

const authController = {
	logout,
	registerUser,
	renderLogin,
	renderRegister,
	sendCurrentUser
};

export default authController;
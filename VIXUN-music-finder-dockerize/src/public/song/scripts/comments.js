const displayComments = {
	form : {
		cancel  : document.querySelector("#form-new-comment .comment-delete"),
		confirm : document.querySelector("#form-new-comment .comment-confirm"),
		element : document.getElementById("form-new-comment"),
	},
	render : {
		container : document.getElementById("display-comments-render"),

		/**
		 * Render comments and check the current user's authorization to manipulate
		 * them.
		 *
		 * @param {object} user
		 * A user document for authorization.
		 *
		 * @param {...import("../../../models/comment.js").CommentDocument} commentArr
		 * A `CommentDocument` array of the current `Song`.
		 */
		renderComments(user, ...commentArr) {
			for (const comment of commentArr) {
				let newComment;

				if (comment.user._id === user._id) {
					newComment = this.templateEditable.cloneNode(true);

					const deleteButt = newComment.querySelector(".comment-delete");
					const confirmButt = newComment.querySelector(".comment-confirm");

					deleteButt.addEventListener("submit", async function(e) {
						try {
							e.preventDefault();
							e.stopPropagation();
							const result = await Swal.fire({
								cancelButtonColor  : "#d33",
								confirmButtonColor : "#3085d6",
								confirmButtonText  : "Confirm",
								icon               : "warning",
								showCancelButton   : true,
								text               : "You won't be able to revert this!",
								title              : "Delete your comment?",
							});
							if (result.isConfirmed) {
								await axios.delete(`${window.location.pathname}/comments/${comment._id}`);
								newComment.remove();
								Swal.fire({
									confirmButtonText : "Okay",
									icon              : "success",
									text              : "Your comment has been deleted!",
									title             : "Success!"
								});
							}
						} catch (err) {
							Swal.fire({
								confirmButtonText : "Okay",
								icon              : "error",
								text              : err.message,
								title             : "Error!"
							});
							console.error(err);
						}
					});

					confirmButt.addEventListener("submit", async function(e) {
						try {
							e.preventDefault();
							e.stopPropagation();

							const commentText = newComment.querySelector(".comment-text");
							const updateComment = (await axios.patch(
								`${window.location.pathname}/comments/${comment._id}`,
								{ text : commentText.value }
							)).data;

							commentText.value = updateComment.text;

							Swal.fire({
								confirmButtonText : "Okay",
								icon              : "success",
								text              : "Your comment has been updated!",
								title             : "Success!"
							});
						} catch (err) {
							Swal.fire({
								confirmButtonText : "Okay",
								icon              : "error",
								text              : err.message,
								title             : "Error!"
							});
							console.error(err);
						}
					});
				} else {
					newComment = this.templateFixed.cloneNode(true);
				}

				newComment.querySelector(".comment-text").innerText = comment.text;
				newComment.querySelector(".comment-username").innerText = comment.user.username;
				this.container.append(newComment);
			}
		},
		templateEditable : document.getElementById("comment-template-editable").content.firstElementChild,
		templateFixed    : document.getElementById("comment-template-fixed").content.firstElementChild
	}
};

export default displayComments;
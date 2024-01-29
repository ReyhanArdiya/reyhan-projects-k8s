const userProfile = document.querySelector("#user-image img");
const profileFormInput = document.getElementById("form-profile-input");

userProfile.addEventListener("click", function() {
	profileFormInput.click();
});

profileFormInput.addEventListener("change", async function() {
	const progressBar = new ProgressBar.Circle(
		userProfile.parentElement,
		{
			color    : "#ff0000",
			duration : 3000,
			easing   : "easeInOut",
			from     : { color : "#ff0000" },
			step(state, circle) {
				circle.path.setAttribute("stroke", state.color);
			},
			strokeWidth : 5,
			to          : { color : "#a129ff" },
		}
	);

	try {
		if (profileFormInput.files[0].size > 1_000_000) {
			// eslint-disable-next-line no-undef
			Swal.fire({
				confirmButtonText : "Okay",
				icon              : "error",
				text              : "Image can't be larger than 1mb!",
				title             : "Too Big!",
			});
		} else if (!profileFormInput.files[0].type.match(/^image\/(jpg|jpeg|png)$/)) {
			throw new Error("File must be an image!");
		} else if (profileFormInput.files.length) {
			const imageData = new FormData();
			imageData.append("img", profileFormInput.files[0]);

			progressBar.animate(1);
			const newProfile = await axios.post(
				"/user/profile",
				imageData,
				{
					headers : { "Content-Type" : "multipart/form-data" },
					timeout : 10000
				}
			);

			userProfile.src = newProfile.data.path.replace("/upload", "/upload/w_250");
		}
	} catch (err) {
		// eslint-disable-next-line no-undef
		Swal.fire({
			confirmButtonText : "Okay",
			icon              : "error",
			text              : err.message,
			title             : "Error!",
		});
	}

	progressBar.destroy();
});
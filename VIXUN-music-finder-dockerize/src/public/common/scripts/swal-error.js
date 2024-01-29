const errorTemp = document.getElementById("error-text");

// eslint-disable-next-line no-undef
Swal.fire({
	confirmButtonText : "Okay",
	icon              : "error",
	text              : errorTemp.innerText,
	title             : "Error!"
});
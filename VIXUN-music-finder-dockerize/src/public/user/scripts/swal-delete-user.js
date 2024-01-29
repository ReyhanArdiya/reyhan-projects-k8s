const formDelete = document.getElementById("user-delete");

formDelete.addEventListener("submit", async function(e) {
	e.preventDefault();

	const result = await Swal.fire({
		cancelButtonColor  : "#d33",
		confirmButtonColor : "#3085d6",
		confirmButtonText  : "Confirm",
		icon               : "warning",
		showCancelButton   : true,
		text               : "You won't be able to revert this!",
		title              : "Delete your account?",
	});

	if (result.isConfirmed) {
		e.target.submit();
	}
});
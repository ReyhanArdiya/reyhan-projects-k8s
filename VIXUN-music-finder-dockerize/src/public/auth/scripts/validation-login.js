const validation = new window.JustValidate(
	"#form-auth form",
	{
		focusInvalidField : true,
		tooltip           : { position : "bottom" }
	}
);

validation
	.addField("#username", [
		{
			errorMessage : "Username/E-mail is required!",
			rule         : "required",
		}
	])
	.addField("#password", [
		{
			errorMessage : "Password is required!",
			rule         : "required",
		}
	])
	.onSuccess(event => {
		event.target.submit();
	});

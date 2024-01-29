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
			errorMessage : "Username is required!",
			rule         : "required",
		},
		{
			rule  : "minLength",
			value : 3
		},
		{
			rule  : "maxLength",
			value : 20
		}
	])
	.addField("#email", [
		{
			errorMessage : "Email is required!",
			rule         : "required",
		},
		{ rule : "email" }
	])
	.addField("#password", [
		{
			errorMessage : "Password is required!",
			rule         : "required",
		},
		{ rule : "password" }
	])
	.onSuccess(event => {
		event.target.submit();
	});

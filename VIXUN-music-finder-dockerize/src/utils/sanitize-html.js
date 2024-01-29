import htmlSanitizer from "sanitize-html";

const sanitizeHtml = html => 	{
	return htmlSanitizer(html, {
		allowedTags        : [],
		disallowedTagsMode : "escape",
	});
};

export default sanitizeHtml;

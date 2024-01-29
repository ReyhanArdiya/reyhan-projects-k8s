import React from "react";

const SearchContext = React.createContext({
	searchResults : [
		{
			name         : "",
			officialSite : "",
			src          : "",
		}
	]
});

export default SearchContext;
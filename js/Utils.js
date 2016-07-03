var Utils = {
	getContentOfCDATA: cdata => {
		var CDATA_START = "[CDATA[", CDATA_END = "]]";
		return cdata.slice(
			cdata.indexOf(CDATA_START) + CDATA_START.length,
			cdata.indexOf(CDATA_END)
		);
	},
	parseAuthor: content => content.slice(
		content.indexOf('(') + 1,
		content.indexOf(')')
	),
	_PARSER: new DOMParser(),
	parseHTML: text => {
		return Utils._PARSER.parseFromString(text, "text/html");
	}
};

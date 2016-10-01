const Utils = {
	getContentOfCDATA: cdata => {
		const CDATA_START = "[CDATA[", CDATA_END = "]]";
		return cdata.slice(
			cdata.indexOf(CDATA_START) + CDATA_START.length,
			cdata.indexOf(CDATA_END)
		);
	},
	parseAuthor: content => content.slice(
		content.indexOf('(') + 1,
		content.indexOf(')')
	),
	PARSER: new DOMParser(),
	parseHTML: function (text) {
		return this.PARSER.parseFromString(text, "text/html");
	}
};

const Utils = (() => {
	const PARSER = new DOMParser();

	return class {
		static getContentOfCDATA(cdata) {
			const CDATA_START = "[CDATA[", CDATA_END = "]]";
			return cdata.slice(
				cdata.indexOf(CDATA_START) + CDATA_START.length,
				cdata.indexOf(CDATA_END)
			);
		}
		static parseAuthor(content) {
			return content.slice(
				content.indexOf('(') + 1,
				content.indexOf(')')
			)
		}
		static parseHTML(text) {
			return PARSER.parseFromString(text, "text/html");
		}
	}
})();

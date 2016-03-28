var Utils = {
	STATE_DONE: 4,
	STATUS_OK:  200,
	TIME_1S:    1000,
	TIME_1H:    1000 * 60 * 60,
	SPEED_DIAL: "://startpage/",

	getContentOfCDATA: function (cdata) {
		var CDATA_START = "[CDATA[";
		var CDATA_END   = "]]";
		return cdata.slice(
			cdata.indexOf(CDATA_START) + CDATA_START.length,
			cdata.indexOf(CDATA_END)
		);
	},
	createDiv: function (content) {
		var element = document.createElement("div");
		element.innerHTML = content;
		return element;
	}
}

var Constants = {
	CDATA_START: "[CDATA[",
	CDATA_END:   "]]",
	STATE_DONE:   4,
	STATUS_OK:    200,
	INTERVAL_12H: 1000 * 60 * 60 * 12
};

function fetchFeed() {
	loading.show();
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.readyState == Constants.STATE_DONE && this.status == Constants.STATUS_OK) {
			parseFeed(xhr.responseText);
			loading.hide();
		}
	};
	xhr.open("GET", "https://interfacelift.com/wallpaper/rss/index.xml");
	try {
		xhr.send(null);
	} catch (err) {
		console.log("Opera Extension - InterfaceLIFT Wallpapers > Failed contacting server: " + err.message);
	}
}

function parseFeed(response) {
	if (response.length == 0) {
		return;
	}

	var temp = document.createElement("div");
	temp.innerHTML = response;
	var feedItem = temp.getElementsByTagName("item")[0];
	temp.innerHTML = getContentOfCDATA(feedItem.getElementsByTagName("description")[0].innerHTML);
	var sdUrl = temp.getElementsByTagName('a')[0].href;
	var sdTitle = getContentOfCDATA(feedItem.getElementsByTagName("title")[0].innerHTML);
	opr.speeddial.update({
		title: sdTitle,
		url:   sdUrl
	});
	document.body.style.backgroundImage = "url(" + temp.getElementsByTagName("img")[0].src + ')';
}

var loading = {
	element: document.getElementById("loading"),
	show: function () {
		this.element.style.display = "block";
	},
	hide: function () {
		this.element.style.display = "none";
	}
};

function getContentOfCDATA(cdata) {
	return cdata.slice(
		cdata.indexOf(Constants.CDATA_START) + Constants.CDATA_START.length,
		cdata.indexOf(Constants.CDATA_END)
	);
}

window.addEventListener("load", function () {
	fetchFeed();
	window.setInterval(function() {
	  fetchFeed();
	}, Constants.INTERVAL_12H);
}, false);

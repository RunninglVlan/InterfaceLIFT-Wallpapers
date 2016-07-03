function Background() {
	var CHANGE_TIME_MS = 1000;
	var DEFAULT_CLASS  = "background";
	var FADEABLE_CLASS = "fadeable";
	var back  = document.querySelector("#backBackground");
	var front = document.querySelector("#frontBackground");

	this.change = imgSrc => {
		front.style.backgroundImage = back.style.backgroundImage || "url(img/white.gif)";
		removeFadeable();
		front.style.opacity = 1;
		window.setTimeout(() => {
			back.style.backgroundImage = "url(" + imgSrc + ')';
			window.setTimeout(() => {
				addFadeable();
				front.style.opacity = 0;
			}, CHANGE_TIME_MS);
		}, CHANGE_TIME_MS);
	};
	this.isEmpty = () => !(back.style.backgroundImage || front.style.backgroundImage);
	var removeFadeable = () => {
		front.className = DEFAULT_CLASS;
	};
	var addFadeable = () => {
		front.className = DEFAULT_CLASS + " " + FADEABLE_CLASS;
	};
}

function Background() {
	const CHANGE_TIME_MS = 1000;
	const DEFAULT_CLASS  = "background", FADEABLE_CLASS = "fadeable";

	const back  = document.querySelector("#backBackground");
	const front = document.querySelector("#frontBackground");

	this.change = imgSrc => {
		front.style.backgroundImage = back.style.backgroundImage || "url(img/white.gif)";
		removeFadeable();
		front.style.opacity = 1;
		window.setTimeout(() => {
			back.style.backgroundImage = `url(${imgSrc})`;
			window.setTimeout(() => {
				addFadeable();
				front.style.opacity = 0;
			}, CHANGE_TIME_MS);
		}, CHANGE_TIME_MS);
	};
	this.isEmpty = () => !(back.style.backgroundImage || front.style.backgroundImage);
	const removeFadeable = () => {
		front.className = DEFAULT_CLASS;
	};
	const addFadeable = () => {
		front.className = `${DEFAULT_CLASS} ${FADEABLE_CLASS}`;
	};
}

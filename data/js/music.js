function music(src) {
	this.music = document.createElement("audio");
	this.music.src = src;
	this.music.setAttribute("preload", "auto");
	this.music.setAttribute("controls", "none");
	this.music.setAttribute("loop", "true");
	this.music.style.display = "none";
	document.body.appendChild(this.music);
	this.play = function() {
		this.music.play();
	}
	this.stop = function() {
		this.music.pause();
	}
}
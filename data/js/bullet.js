function bullet(x, y) {
	this.x = x;
	this.y = y;

	this.SPEED = 20;

	this.WIDTH = 4;
	this.HEIGHT = 8;

	this.update = function() {
		this.y -= this.SPEED;
	}
}
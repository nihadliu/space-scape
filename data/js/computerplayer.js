function computerPlayer(x, y) {
	this.x = x;
	this.y = y;

	this.SPEED = 10;

	this.WIDTH = 64;
	this.HEIGHT = 23;

	this.moveDown = function() {
		this.y += this.SPEED;
	}

	this.moveLeft = function() {
		this.x -= this.SPEED;
	}

	this.moveRight = function() {
		this.x += this.SPEED;
	}

	this.moveUp = function() {
		this.y -= this.SPEED;
	}
}
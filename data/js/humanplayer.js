function humanPlayer(x, y) {
	this.x = x;
	this.y = y;

	this.SPEED = 10;

	this.WIDTH = 28;
	this.HEIGHT = 32;

	this.moveDown = function() {
		if(this.y + this.HEIGHT < 600) {
			this.y += this.SPEED;
		}
	}

	this.moveLeft = function() {
		if(this.x > 0) {
			this.x -= this.SPEED;
		}
	}

	this.moveRight = function() {
		if(this.x + this.WIDTH < 800) {
			this.x += this.SPEED;
		}
	}

	this.moveUp = function() {
		if(this.y > 0) {
			this.y -= this.SPEED;
		}
	}
}
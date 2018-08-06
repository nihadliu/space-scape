function explosion(x, y) {
	this.x = x;
	this.y = y;
	this.counter = new counter(10);
	this.remove = false;

	this.update = function() {
		if(this.counter.isCounted()) {
			this.remove = true;
		} else {
			this.counter.count();
		}
	}
}
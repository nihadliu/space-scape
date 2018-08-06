function counter(end) {
	this.c = 0;
	this.end = end;

	this.isCounted = function() {
		return this.c == this.end;
	}

	this.count = function() {
		if(this.isCounted()) {
			this.c = 0;
		} else {
			this.c++;
		}
	}

	this.reset = function() {
		this.c = 0;
	}
}
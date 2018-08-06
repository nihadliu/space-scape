function controls() {
	this.down = false;
	this.left = false;
	this.right = false;
	this.up = false;
	this.shoot = false;

	this.reset = function() {
		this.down = false;
		this.left = false;
		this.right = false;
		this.up = false;
		this.shoot = false;
	}

	this.update = function(evt, b) {
		switch(evt.keyCode) {
		case 32:
			{
				this.shoot = b;
			}
			break;
		case 65:
			{
				this.left = b;
			}
			break;
		case 68:
			{
				this.right = b;
			}
			break;
		case 83:
			{
				this.down = b;
			}
			break;
		case 87:
			{
				this.up = b;
			}
			break;
		default:
			break;
		}
	}
}
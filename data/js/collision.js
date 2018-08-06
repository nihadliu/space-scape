function collision() {
	this.isCollisionWithBullet = function(computerPlayer, bullet) {
		if(computerPlayer.x + computerPlayer.WIDTH >= bullet.x) {
			if(computerPlayer.x <= bullet.x + bullet.WIDTH) {
				if(computerPlayer.y + computerPlayer.HEIGHT >= bullet.y) {
					if(computerPlayer.y <= bullet.y + bullet.HEIGHT) {
						return true;
					}
				}
			}
		}
		return false;
	}
	this.isCollisionWithComputerPlayer = function(humanPlayer, computerPlayer) {
		if(humanPlayer.x + humanPlayer.WIDTH >= computerPlayer.x) {
			if(humanPlayer.x <= computerPlayer.x + computerPlayer.WIDTH) {
				if(humanPlayer.y + humanPlayer.HEIGHT >= computerPlayer.y) {
					if(humanPlayer.y <= computerPlayer.y + computerPlayer.HEIGHT) {
						return true;
					}
				}
			}
		}
		return false;
	}
}
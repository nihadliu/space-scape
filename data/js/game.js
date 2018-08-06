var canvas;
var ctx;

var titleSpaceImg = new Image();
titleSpaceImg.src = "data/img/titles/space.png";
var titleScapeImg = new Image();
titleScapeImg.src = "data/img/titles/scape.png";
var titleGameImg = new Image();
titleGameImg.src = "data/img/titles/game.png";
var titleOverImg = new Image();
titleOverImg.src = "data/img/titles/over.png";

var liuImg = new Image();
liuImg.src = "data/img/liu.png";

var playerImg = new Image();
playerImg.src = "data/img/players/player.png";

var enemyImg = new Image();
enemyImg.src = "data/img/players/enemy.png";

var bgm;
var bgmPlaying = false;

var shotSound;
var explosionSound;
var gameOverSound;

var SCREEN_TITLE = 0;
var SCREEN_GAME = 1;
var SCREEN_GAME_OVER = 2;
var screenId = SCREEN_TITLE;

var gameOverCounter = new counter(180);

var player = new humanPlayer(0, 0);

var playerControls = new controls();

var computerPlayers = new Array();

var enemyCounter = new counter(60);

var level = 1;
var levelCounter = new counter(500);

var col = new collision();

var score = 0;

var bullets = new Array();
var leftBullet = false;
var weaponCounter = new counter(2);
var canShoot = true;

var explosions = new Array();

function startGame() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	bgm = new music("data/music/hayden.ogg");

	shotSound = new sound("data/sounds/shot.wav");
	explosionSound = new sound("data/sounds/explosion.wav");
	gameOverSound = new sound("data/sounds/gameover.wav");

	draw();
}

function resetGame() {
	score = 0;
	bullets = [];
	playerControls.reset();
	player = new humanPlayer(400 - (playerImg.width / 2), 500);
	computerPlayers = [];
	enemyCounter.reset();
	leftBullet = false;
	weaponCounter.reset();
	canShoot = true;
	explosions = [];
	level = 1;
	levelCounter = new counter(500);
}

function gameOver() {
	screenId = SCREEN_GAME_OVER;
	gameOverCounter.reset();
	gameOverSound.play();
}

function keyDown(evt) {
	switch(screenId) {
	case SCREEN_GAME:
		{
			playerControls.update(evt, true);
		}
		break;
	default:
		break;
	}
}

function keyUp(evt) {
	switch(screenId) {
	case SCREEN_TITLE:
		{
			switch(evt.keyCode) {
			case 13:
				{
					if(!bgmPlaying) {
						bgm.play();
						bgmPlaying = true;
					}
					resetGame();
					screenId = SCREEN_GAME;
				}
			break;
			default:
				break;
			}
		}
		break;
	case SCREEN_GAME:
		{
			playerControls.update(evt, false);
		}
		break;
	default:
		break;
	}
}

function initialize() {
	window.addEventListener("load", resize, false);
	window.addEventListener("resize", resize, false);
	setInterval(draw, 16);
}

function draw() {
	ctx.fillStyle="#000010";
	ctx.fillRect(0, 0, 800, 600);
	switch(screenId) {
	case SCREEN_TITLE:
		{
			ctx.drawImage(titleSpaceImg, 400 - (titleSpaceImg.width / 2), 10, titleSpaceImg.width, titleSpaceImg.height);
			ctx.drawImage(titleScapeImg, 400 - (titleScapeImg.width / 2), 10 + titleSpaceImg.height + 10, titleScapeImg.width, titleScapeImg.height);

			ctx.drawImage(liuImg, 800 - liuImg.width - 10, 600 - liuImg.height - 10, liuImg.width, liuImg.height);

			ctx.font = "24px gamefont";
			ctx.fillStyle = "#ffffff";
			// Programmer
			var str = "Programmer: Nihad Liu Karajko";
			var m = ctx.measureText(str);
			ctx.fillText(str, 400 - (m.width / 2), 10 + titleSpaceImg.height + 10 + titleScapeImg.height + 10 + 64);
			// E-Mail
			str = "nihadliu@gmail.com";
			m = ctx.measureText(str);
			ctx.fillText(str, 400 - (m.width / 2), 10 + titleSpaceImg.height + 10 + titleScapeImg.height + 10 + 64 + 32);
			// Website
			str = "nihadliu.wordpress.com";
			m = ctx.measureText(str);
			ctx.fillText(str, 400 - (m.width / 2), 10 + titleSpaceImg.height + 10 + titleScapeImg.height + 10 + 64 + 32 + 32);
			// How to Play
			str = "How to Play";
			m = ctx.measureText(str);
			ctx.fillText(str, 400 - (m.width / 2), 10 + titleSpaceImg.height + 10 + titleScapeImg.height + 10 + 64 + 32 + 64 + 32);
			// Keys
			str = "W/A/S/D: Move | Space: Shoot";
			m = ctx.measureText(str);
			ctx.fillText(str, 400 - (m.width / 2), 10 + titleSpaceImg.height + 10 + titleScapeImg.height + 10 + 64 + 32 + 64 + 32 + 32);
			// Press Enter to Play
			ctx.font = "32px gamefont";
			str = "Press Enter to Play";
			m = ctx.measureText(str);
			ctx.fillText(str, 400 - (m.width / 2), 500);
		}
		break;
	case SCREEN_GAME:
		{
			if(playerControls.down) {
				player.moveDown();
			}
			if(playerControls.left) {
				player.moveLeft();
			}
			if(playerControls.right) {
				player.moveRight();
			}
			if(playerControls.up) {
				player.moveUp();
			}
			if(canShoot && playerControls.shoot) {
				if(leftBullet) {
					var b = new bullet(player.x, player.y);
					b.y += b.HEIGHT / 2;
					bullets.push(b);
				} else {
					var b = new bullet(player.x + player.WIDTH - new bullet(0, 0).WIDTH, player.y);
					b.y += b.HEIGHT / 2;
					bullets.push(b);
				}
				leftBullet = !leftBullet;
				shotSound.play();
				canShoot = false;
				weaponCounter.reset();
			}

			if(!canShoot) {
				if(weaponCounter.isCounted()) {
					canShoot = true;
				} else {
					weaponCounter.count();
				}
			}

			for(var i = 0; i < explosions.length; i++) {
				if(explosions[i].remove) {
					explosions.splice(i, 1);
					i--;
				} else {
					explosions[i].update();
				}
			}

			ctx.fillStyle = "#ffff00";
			for(var i = 0; i < explosions.length; i++) {
				ctx.beginPath();
				ctx.arc(explosions[i].x - (explosions[i].counter.c * 3), explosions[i].y - (explosions[i].counter.c * 3), 10, 0, 2 * Math.PI, false);
				ctx.fill();
				ctx.beginPath();
				ctx.arc(explosions[i].x - (explosions[i].counter.c * 3), explosions[i].y + (explosions[i].counter.c * 3), 10, 0, 2 * Math.PI, false);
				ctx.fill();
				ctx.beginPath();
				ctx.arc(explosions[i].x + (explosions[i].counter.c * 3), explosions[i].y - (explosions[i].counter.c * 3), 10, 0, 2 * Math.PI, false);
				ctx.fill();
				ctx.beginPath();
				ctx.arc(explosions[i].x + (explosions[i].counter.c * 3), explosions[i].y + (explosions[i].counter.c * 3), 10, 0, 2 * Math.PI, false);
				ctx.fill();
			}

			for(var i = 0; i < bullets.length; i++) {
				for(var j = 0; j < computerPlayers.length; j++) {
					if(col.isCollisionWithBullet(computerPlayers[j], bullets[i])) {
						explosions.push(new explosion(computerPlayers[j].x + (computerPlayers[j].WIDTH / 2), computerPlayers[j].y + (computerPlayers[j].HEIGHT / 2)));
						bullets.splice(i, 1);
						computerPlayers.splice(j, 1);
						score++;
						explosionSound.play();
						i--;
						break;
					}
				}
			}

			ctx.fillStyle = "#ffff00";
			for(var i = 0; i < bullets.length; i++) {
				if(bullets[i].y > -bullets[i].HEIGHT) {
					ctx.fillRect(bullets[i].x, bullets[i].y, bullets[i].WIDTH, bullets[i].HEIGHT);
					bullets[i].update();
				} else {
					bullets.splice(i, 1);
					i--;
				}
			}

			if(enemyCounter.isCounted()) {
				for(var i = 1; i <= level; i++) {
					var enemy = new computerPlayer(Math.floor(Math.random() * (800 - new computerPlayer(0, 0).WIDTH)), -new computerPlayer(0, 0).HEIGHT);
					computerPlayers.push(enemy);
				}
			}
			enemyCounter.count();

			for(var i = 0; i < computerPlayers.length; i++) {
				if(col.isCollisionWithComputerPlayer(player, computerPlayers[i])) {
					gameOver();
					return;
				}
			}

			for(var i = 0; i < computerPlayers.length; i++) {
				if(computerPlayers[i].y < 600) {
					ctx.drawImage(enemyImg, computerPlayers[i].x, computerPlayers[i].y, enemyImg.width, enemyImg.height);
					computerPlayers[i].moveDown();
				} else {
					computerPlayers.splice(i, 1);
					i--;
				}
			}

			if(levelCounter.isCounted()) {
				level++;
				levelCounter = new counter(levelCounter.end + 100);
			} else {
				levelCounter.count();
			}

			ctx.drawImage(playerImg, player.x, player.y, playerImg.width, playerImg.height);

			ctx.font = "24px gamefont";
			ctx.fillStyle = "#ffffff";
			var str = "Score: " + score;
			ctx.fillText(str, 10, 34);
		}
		break;
	case SCREEN_GAME_OVER:
		{
			ctx.drawImage(titleGameImg, 400 - (titleGameImg.width / 2), 300 - (titleGameImg.height) - 10, titleGameImg.width, titleGameImg.height);
			ctx.drawImage(titleOverImg, 400 - (titleOverImg.width / 2), 300 - (titleGameImg.height) + (titleOverImg.height) + 10, titleOverImg.width, titleOverImg.height);

			if(gameOverCounter.isCounted()) {
				screenId = SCREEN_TITLE;
			} else {
				gameOverCounter.count();
			}
		}
		break;
	default:
		break;
	}
}

function resize() {
	var height = window.innerHeight;
	var ratio = canvas.width / canvas.height;
	var width = height * ratio;

	canvas.style.width = width + "px";
	canvas.style.height = height + "px";
}
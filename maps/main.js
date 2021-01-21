let gameMap = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
	[1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
	[1, 2, 1, 1, 2, 2, 2, 2, 2, 1],
	[1, 2, 1, 1, 2, 2, 2, 2, 2, 1],
	[3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
	[1, 2, 2, 3, 2, 1, 1, 1, 1, 1],
	[1, 2, 2, 3, 2, 1, 2, 1, 1, 1],
	[1, 2, 2, 3, 3, 3, 3, 1, 1, 1],
	[1, 2, 2, 2, 2, 1, 2, 2, 2, 1],
	[1, 2, 2, 2, 2, 1, 1, 1, 1, 1],
	[1, 2, 2, 2, 2, 2, 2, 1, 1, 1],
	[1, 2, 4, 2, 4, 2, 2, 1, 1, 1],
	[1, 2, 4, 2, 4, 2, 2, 2, 2, 1],
	[1, 2, 4, 2, 4, 2, 4, 4, 2, 1],
	[1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let mapH = gameMap.length;		//300
let mapW = gameMap[0].length;	//300

function createMap() {
    for (var x = 0; x <= mapW - 1; x++) {
      var row = [];
      for (var y = 0; y <= mapH - 1; y++) {
        row.push(2);
      }
      gameMap.push(row);
    }
  }

let c = document.getElementById('gc');
let cc;


let tileW = 15;
let tileH = 15;

guessX = 0; //stores user's click on canvas
guessY = 0; //stores user's click on canvas

function getCoords(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    guessX = Math.round((x-15) / 15);
    guessY = Math.round((y-8) / 15);
	console.log("x coords: " + guessX + ", y coords: " + guessY)
	console.log(gameMap[guessY][guessX])

	gameMap[guessY][guessX] = 3;
	drawGameColor()
}
window.onload = function () {
	c = document.getElementById('gc');
	cc = c.getContext('2d');

	
	//createMap()
	//drawTrees()
	drawGameColor()
	//drawGameAscii()
	//setInterval(drawGame, 1000 / 60);
};



function drawGameAscii() {

	if (cc == null) {
		return;
	}

	cc.font = "15px Courier New";
	cc.fillStyle = "white";

	for (let y = 0; y < mapH; ++y) {
		for (let x = 0; x < mapW; ++x) {
			//console.log(y + " " + x + ": " + gameMap[y][x])
			switch (gameMap[y][x]) {
				case 1:  cc.fillText('M', x*tileW, y*tileH); break;
				case 2:  cc.fillText(',', x*tileW, y*tileH); break;
				case 3:  cc.fillText('=', x*tileW, y*tileH); break;
				case 4:  cc.fillText('o', x*tileW, y*tileH); break;
				case 24: cc.fillText('S', x*tileW, y*tileH); break;
				case 25: cc.fillText('A', x*tileW, y*tileH); break;
				default: cc.fillText('.', x*tileW, y*tileH); break;
			}
		}
	}
}

function drawGameColor() {

	if (cc == null) {
		return;
	}

	for (let y = 0; y < mapH; ++y) {
		for (let x = 0; x < mapW; ++x) {
			//console.log(y + " " + x + ": " + gameMap[y][x])
			switch (gameMap[y][x]) {
				case 1:  cc.fillStyle = "#555555"; break;
				case 2:  cc.fillStyle = "#009900"; break;
				case 3:  cc.fillStyle = "#b5651d"; break;
				case 4:  cc.fillStyle = "#ffffff"; break;
				case 24: cc.fillStyle = "#b5651d"; break;
				case 25: cc.fillStyle = "#00cc00"; break;
				default: cc.fillStyle = "#dddddd"; break;
			}
			cc.fillRect( x*tileW, y*tileH, tileW, tileH);
		}
	}
}

function drawTrees() {
	//drawTree(8,2)
	//drawTree(9,5)
	//drawTree(13,3)
	drawTree();drawTree();drawTree();drawTree();drawTree();drawTree();drawTree();drawTree();drawTree();drawTree();drawTree();drawTree();drawTree();drawTree();drawTree();drawTree();drawTree();drawTree();drawTree();drawTree();drawTree();drawTree();
}
function drawTree() {

	let positionY = Math.floor(Math.random() * 100) + 1  
	let positionX = Math.floor(Math.random() * 100) + 1

	gameMap[positionY][positionX] = 24
	gameMap[positionY-1][positionX-1] = 25
	gameMap[positionY-1][positionX] = 25
	gameMap[positionY-1][positionX+1] = 25
	gameMap[positionY-2][positionX-1] = 25
	gameMap[positionY-2][positionX] = 25
	gameMap[positionY-2][positionX+1] = 25
	gameMap[positionY-3][positionX] = 25
}

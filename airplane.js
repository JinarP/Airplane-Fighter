let score = 0;
const size = 24;
let speed;
let airPlane = [{i: size - 2, j: size / 2}];
let airPlaneLine = size - 2, airPlaneColumn = size/2;
let lineDirection = 0, columnDirection = 0;
const grid = document.getElementById("grid");
generateBoard();
function easy() {
    speed = 350;
    start();
}
function med() {
    speed = 200;
    start();
}
function dif() {
    speed = 100;
    start();
}
function imp() {
    speed = 70;
    start ();
}
function start (){
    document.addEventListener("keyup", moveDirection);
    document.addEventListener("keyup", moveAirPlane);
    setInterval(moveObstacle, speed);
    setInterval(createObstacle, speed);
}

function generateBoard() {
    document.getElementById("score").innerHTML = "0";
    let cell = 0;
    for (let i = 0; i < size; ++i) {
        let line = grid.insertRow(i);
        for (let j = 0; j < size; ++j) {
            let element = line.insertCell(j);
            if (cell % 2 !== 0) {
                element.style.background = "rgba(27,122,218,0.66)";
            }
            ++cell;
            if (i === 0) {
                element.style.background = "rgb(112,105,105)";
            }
            if (i === size - 1) {
                element.style.background = "rgb(112,105,105)";
            }
            if (j === 0) {
                element.style.background = "rgb(112,105,105)";
            }
            if (j === size - 1) {
                element.style.background = "rgb(112,105,105)";
            }
        }
    }
    grid.rows[size - 2].cells[size / 2].classList.add("airPlane");
}

function moveDirection(buttonPressed) {
    if(buttonPressed.keyCode === 37) {
        lineDirection = 0;
        columnDirection = -1;
    } else if (buttonPressed.keyCode === 39) {
        lineDirection = 0;
        columnDirection = 1;
    }
}

function moveAirPlane() {
    if (checkGameOver() === true) {
        return;
    }
    grid.rows[airPlane[0].i].cells[airPlane[0].j].classList.remove("airPlane");
    airPlane.shift();
    airPlaneLine += lineDirection;
    airPlaneColumn += columnDirection;
    grid.rows[airPlaneLine].cells[airPlaneColumn].classList.add("airPlane");
    airPlane.push({i: airPlaneLine, j: airPlaneColumn});

}


let obstacle = [{obstacleLine: 1, obstacleColumn: 1}];

function moveObstacle () {
    if (checkGameOver() === true) {
        return;
    }
    for (let i = 0; i < obstacle.length; ++i) {
        grid.rows[obstacle[i].obstacleLine].cells[obstacle[i].obstacleColumn].classList.remove("obstacle");
        ++obstacle[i].obstacleLine;
        if (obstacle[i].obstacleLine === size - 1) {
            obstacle.splice(i, 1);
            ++score;
            document.getElementById("score").innerText = score;
        }
        grid.rows[obstacle[i].obstacleLine].cells[obstacle[i].obstacleColumn].classList.add("obstacle");
    }
}

function createObstacle () {
   const randomColumn = Math.floor(Math.random() * ((size - 1) - 1) + 1);
   obstacle.push({obstacleLine: 1, obstacleColumn: randomColumn});
}
function checkGameOver() {
    if (grid.rows[airPlaneLine].cells[airPlaneColumn].classList.contains("obstacle")) {
        document.getElementById("message").innerText = "GAME OVER";
        return true;
    }
}
//Console Game of Life example * = alive cell . = dead cell

//Specify width and number of rows to fit within console space
const WIDTH = 105;
const ROWS = 10;

let screen = []; //Array to hold information on screen
let leftEdgeArray = []; //Array to hold positions of left edge of screen
let rightEdgeArray = []; //Array to hold positions of right edge of screen
let popArray = []; //Array that holds population data for each point

//Function to randomly add alive and dead cells to screen, use in initial condition for loop
function randomInitialCOndition() {
    let rand = Math.floor(Math.random() * 10);
    if(rand < 5) {
        screen.push('*');
    }

    else {
        screen.push('.');
    }
}

//Populate screen array with all dead cells
for(let i = 0; i < ROWS*WIDTH; i++) {
    screen.push('.');
}

//Populate screen with some alive cells
for(let j = 150; j < 175; j++) {
    screen[j] = '*';
}

//Define where the left and right edges of the screen are
function defineEdges() {
    for(let i = 0; i < ROWS; i++) {
        leftEdgeArray.push(WIDTH*i);
    }
    tempArray = leftEdgeArray;
    rightEdgeArray = tempArray.map(x => x + 103);
}

//Function that determines if current cell is on an edge
function determineEdge(item) {
    for(let i = 0; i < leftEdgeArray.length; i++) {
        if(item == leftEdgeArray[i]) {
            return 'leftEdge';
        }
    }

    for(let i = 0; i < rightEdgeArray.length; i++) {
        if(item == rightEdgeArray[i]) {
            return 'rightEdge';
        }
    }
    return 'middle';
}

//Function that goes through each cell on screen and determines what the next state of it should be
function updatePopulation() {
    for(let i = 0; i < ROWS*WIDTH; i++) {

        //Define objects for position and alive or dead status, 1 is alove and 0 is dead
        let adjOBJ = {
            currentLeft: i-1,
            currentRight: i + 1,
            currentTop: i - WIDTH,
            currentBottom: i + WIDTH,
        }
        let diagOBJ = {
            currentDiagTopLeft: adjOBJ.currentTop - 1,
            currentDiagTopRight: adjOBJ.currentTop + 1,
            currentDiagBottomLeft: adjOBJ.currentBottom - 1,
            currentDiagBottomRight: adjOBJ.currentBottom + 1
        }
        let statsOBJ = {
            leftStatus: 1,
            rightStatus: 1,
            topStatus: 1,
            bottomStatus: 1,
            bottomLeftDiagStatus: 1,
            bottomRightDiagStatus: 1,
            topLeftDiagStatus: 1,
            topRightDiagStatus: 1
        }

        //Assign a variable to keep track of if the current item is alive or dead
        let currentItem = 'alive';

        //Change the status of the current cell if it is a dead cell
        if(screen[i] == '.') {
            currentItem = 'dead';
        }

        //Determine where the current cell is and assign the status and location variables accordingly
        if(determineEdge(i) == 'leftEdge') {
            adjOBJ.currentLeft = null;
            diagOBJ.currentDiagTopLeft = null;
            diagOBJ.currentDiagBottomLeft = null;
            statsOBJ.leftStatus = 0;
            statsOBJ.bottomLeftDiagStatus = 0;
            statsOBJ.topLeftDiagStatus = 0;
        }
        if(determineEdge(i) == 'rightEdge') {
            adjOBJ.currentRight = null;
            diagOBJ.currentDiagBottomRight = null;
            diagOBJ.currentDiagTopRight = null;
            statsOBJ.rightStatus = 0;
            statsOBJ.topRightDiagStatus = 0;
            statsOBJ.bottomRightDiagStatus = 0;
        }
        if(i >= leftEdgeArray[0] && i <= rightEdgeArray[0]) {
            adjOBJ.currentTop = null;
            diagOBJ.currentDiagTopRight = null;
            diagOBJ.currentDiagTopLeft = null;
            statsOBJ.topStatus = 0;
            statsOBJ.topLeftDiagStatus = 0;
            statsOBJ.topRightDiagStatus = 0;
        }
        if(i >= leftEdgeArray.slice(-1)[0] && i <= rightEdgeArray.slice(-1)[0]) {
            adjOBJ.currentBottom = null;
            diagOBJ.currentDiagBottomRight = null;
            diagOBJ.currentDiagBottomLeft = null;
            statsOBJ.bottomStatus = 0;
            statsOBJ.bottomLeftDiagStatus = 0;
            statsOBJ.bottomRightDiagStatus = 0;
        }

        
        //Check living or dead status and update status accordingly
        if(screen[adjOBJ.currentLeft] == '.') {
            statsOBJ.leftStatus = 0;
        }
        if(screen[diagOBJ.currentDiagTopLeft] == '.') {
            statsOBJ.topLeftDiagStatus = 0;
        }
        if(screen[adjOBJ.currentRight] == '.') {
            statsOBJ.rightStatus = 0;
        }
        if(screen[diagOBJ.currentDiagTopRight] == '.') {
            statsOBJ.topRightDiagStatus = 0;
        }
        if(screen[adjOBJ.currentTop] == '.') {
            statsOBJ.topStatus = 0;
        }
        if(screen[diagOBJ.currentDiagBottomRight] == '.') {
            statsOBJ.bottomRightDiagStatus = 0;
        }
        if(screen[diagOBJ.currentDiagBottomLeft] == '.') {
            statsOBJ.bottomLeftDiagStatus = 0;
        }
        if(screen[adjOBJ.currentBottom] == '.') {
            statsOBJ.bottomStatus = 0;
        }
        popArray.push([statsOBJ.leftStatus, statsOBJ.topLeftDiagStatus, statsOBJ.topStatus, statsOBJ.topRightDiagStatus, statsOBJ.rightStatus, statsOBJ.bottomRightDiagStatus, statsOBJ.bottomStatus, statsOBJ.bottomLeftDiagStatus, currentItem]);
    }
}

//Draw population on screen based on Conway's rules
function drawPopulation() {
    for(let i = 0; i < ROWS*WIDTH; i++) {
        let currentSum = 0;
        for(let j = 0; j < popArray[i].length-1; j++) {
            currentSum = currentSum + parseInt(popArray[i][j]);
        }
        if(popArray[i][8] == 'alive') {
            if(currentSum < 2) {
                popArray[i][8] = 'dead';
                screen[i] = '.';
            } 
            else if(currentSum > 3) {
                popArray[i][8] = 'dead';
                screen[i] = '.';
            }
            else if(currentSum == 2 || currentSum == 3){
                popArray[i][8] = 'alive';
                screen[i] = '*';
            }
        }
        else if(popArray[i][8] == 'dead') {
            if(currentSum == 3) {
                popArray[i][8] == 'alive';
                screen[i] = '*';
            }
        }
    }
}

function printScreen() {
    console.log(screen.join(''));
}

printScreen();
defineEdges();

setInterval(function() {
    popArray = [];
    updatePopulation();
    drawPopulation();
    console.log('-------');
    printScreen();    
    console.log('-------');
}, 1000);

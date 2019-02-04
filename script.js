let gridSize = 64;
let newDiv = document.createElement('div');
newDiv.setAttribute('class', 'box');
let container = document.querySelector('.container');
// define grid as a list so we can push values to it
let grid = [];
let reset = document.querySelector('.reset');
let newGrid = document.querySelector('.new');
let rainbow = document.querySelector('.rainbow');
let black = document.querySelector('.black');

// for every div that's going to be made, add 1fr to grid
// if we had a grid of 16 x 16 we'd need 1fr 16 times for them to fit evenly
function setGrid() {
    for (i = 0; i < gridSize; i++) {
        grid.push('1fr');
    }
}

function initGrid() {
    setGrid();
    // grid is converted to a string and afterwards used to set our attributes
    grid = grid.join(' ');
    container.style.gridTemplateRows = grid;
    container.style.gridTemplateColumns = grid;
    // this is necessary because after join grid becomes a string
    // if it's a string, we can't .push so we can't reset the grid
    // check setGrid function on top
    grid = [];
}

function generateGrid() {
    for (i = 0; i < gridSize * gridSize; i++) {
        let divCln = newDiv.cloneNode(true);
        container.appendChild(divCln);
    }
}

// every time we hover over a div, get a random number and use it to style background
function getRainbow() {
    rainbow.addEventListener('click', () => {
        allDiv.forEach(function(div) {
            div.addEventListener('mouseover', () => {
                let random1 = Math.floor(Math.random() * 256);
                let random2 = Math.floor(Math.random() * 256);
                div.style.background = `rgb(255, ${random1}, ${random2})`;
            })
        })
    })
};

function getBlack() {
    black.addEventListener('click', () => allDiv.forEach((div) => {
        div.addEventListener('mouseover', () => div.style.background = '#000')
    }))
}

// this is the reset, reverts the color of all divs to original value
function getClear() {
    allDiv.forEach((div) => div.style.background = '#fff')
}

function getReset() {
    reset.addEventListener('click', getClear);
}

// new grid just sets up gridSize and runs our grid generator again
function getNewGrid() {
    newGrid.addEventListener('click', () => {
        gridSize = prompt('Grid size? 0 - 64');
        if(isNaN(gridSize)) {
            alert('Please type a number.');
        } else if(gridSize > 64) {
            alert('Number is too high.');
        } else if(!gridSize) {
            alert('Please enter a value.');
        } else if(gridSize < 0) {
            alert('The grid can\'t be negative.')
        } else {
            initGrid();
            generateGrid();
            getClear();
        }
    })
}

// default color
function getDefault() {
    allDiv.forEach(function(div) {
        div.addEventListener('mouseover', () => div.style.background = '#000');
    })
}

// all of the buttons and the default color
function getFunc() {
    getDefault();
    getReset();
    getNewGrid();
    getRainbow();
    getBlack();
}

initGrid();
generateGrid();
let allDiv = document.querySelectorAll('.box');
getFunc();

    
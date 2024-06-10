fetch('assets/json/composers.json')
  .then(response => response.json())
  .then(jsonResponse => console.log(jsonResponse))     
   // outputs a javascript object from the parsed json

function drawBox(container, row, col, letter = "") {
    const box = document.createElement("div");
    box.className = "box";
    box.id = `box${row}${col}`;
    box.textContent = letter;

    container.appendChild(box);
}

function drawGrid(container) {
    const grid = document.createElement("div");
    grid.className = "grid";

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            drawBox(grid, i, j);
        }
    }
}

function startup() {

}

startup();
function parseBoard(plan) {
    return plan.trim().split("\n").map(r => [...r]);
}

function checkRow(board, y, num) {
    const row = board[y];
    return row.includes(String(num));
}

function checkColumn(board, x, num) {
    const col = board.map(r => r[x]);
    return col.includes(String(num));
}

function checkBox(board, x, y, num) {
    x = Math.floor(x / 3) * 3;
    y = Math.floor(y / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[y + i][x + j] === String(num)) return true;
        }
    }
    return false;
}

function isValid(board, x, y, num) {
    return (!checkColumn(board, x, num) && !checkRow(board, y, num) && !checkBox(board, x, y, num));
}

function findUnassigned(board) {
    for (let i = 0; i < board.length; i++) {
        if (board[i].includes('.')) {
            return [board[i].indexOf('.'), i];
        }
    }
    return [-1, -1];
}

function createShuffledAvailable() {
    const availableNums = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return availableNums
        .map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1]);
}

function placeNumber(board) {
    const [x, y] = findUnassigned(board);

    if (y === -1) {
        renderGrid(board);
        return true;
    }

    const available = createShuffledAvailable();

    for (let i = 0; i < available.length; i++) {
        const num = available[i];
        if (isValid(board, x, y, num)) {
            board[y][x] = String(num);
            if (placeNumber(board)) return true;
            board[y][x] = '.';
        }
    }
    return false;
}

function renderGrid(grid) {
    console.log(grid);
    grid.forEach(row => console.log(row.join()));
}

const sample = `
...26.7.1
68..7..9.
19...45..
82.1...4.
..46.29..
.5...3.28
..93...74
.4..5..36
7.3.18...`;


const sampleSolution = `
435269781
682571493
197834562
826125347
374682915
951743628
519326874
248957136
763418259`;

const sampleHard = `
.2.......
...6....3
.74.8....
.....3..2
.8..4..1.
6..5.....
....1.78.
5....9...
.......4.`;

const blank = `
.........
.........
.........
.........
.........
.........
.........
.........
.........`;


const sampleBoard = parseBoard(sample);
const hardBoard = parseBoard(sampleHard);
const blankBoard = parseBoard(blank);
placeNumber(sampleBoard);

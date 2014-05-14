var SUDOKU = {};

var u = undefined;

// The sudoku puzzle
SUDOKU.puzzle = [
            /* B0 */    /* B1 */  /* B2 */
    /* 0 */ [ u, u, u,  3, 9, u,  u, 1, u ],
    /* 1 */ [ 5, u, 1,  u, u, u,  u, 4, u ],
    /* 2 */ [ 9, u, u,  7, u, u,  5, u, u ],

            /* B3 */    /* B4 */  /* B5 */
    /* 3 */ [ 6, u, 2,  5, 3, u,  u, 7, u ],
    /* 4 */ [ u, u, u,  u, 7, u,  u, u, 8 ],
    /* 5 */ [ 7, u, u,  8, u, u,  9, u, 3 ],

            /* B6 */    /* B7 */  /* B8 */
    /* 6 */ [ 8, u, 3,  u, 1, u,  u, 9, u ],
    /* 7 */ [ u, 9, u,  2, u, 6,  u, u, 7 ],
    /* 8 */ [ 4, u, u,  u, u, 3,  u, 6, 1 ]
];

SUDOKU.checkPuzzle = function () {
    var puz = this.puzzle;
    var undefinedValues = false;
    var i = 0, x = 0;
    for (i = 0; i < puz.length; i++) {
        for (x = 0; x < puz[i].length; x++) {
            if (typeof puz[i][x] === 'number') {
                var value = puz[i][x];
                puz[i][x] = {
                    'value': value,
                    'possibleValues': [],
                    'row': i,
                    'column': x
                }
            } else if (puz[i][x] === undefined || puz[i][x].value === undefined) {
                puz[i][x] = {
                    'value': undefined,
                    'possibleValues': this.getPossibleValues(i, x),
                    'row': i,
                    'column': x
                }
                undefinedValues = true;
            }
        }
    }

    this.logPuzzle();
    this.setDefinites();

    if (undefinedValues) {
        this.checkPuzzle();
    } else {
        console.log('DONE!');
    }
};

SUDOKU.existsInRow = function (value, row) {
    var puz = this.puzzle;
    var i = 0;
    for (i = 0; i < puz[row].length; i++) {
        if (puz[row][i] && puz[row][i].value === value) {
            return true;
        }
    }

    return false;
};

SUDOKU.existsInCol = function (value, col) {
    var puz = this.puzzle;
    var i = 0;
    for (i = 0; i < puz.length; i++) {
        if (puz[i][col] && puz[i][col].value === value) {
            return true;
        }
    }

    return false;
};


SUDOKU.existsInBlock = function (value, block) {
    var i = 0, x = 0;
    for (i = 0; i < block.length; i++) {
        for (x = 0; x < block[i].length; x++) {
            if (block[i][x] && block[i][x].value  === value) {
                return true;
            }
        }
    }

    return false;
};

SUDOKU.getBlock = function (row, col) {
    var puz = this.puzzle;
    var block = [];

    var x = Math.floor(col / 3) * 3;
    var y = Math.floor(row / 3) * 3;

    var b = 0;
    for (b = 0; b <= 2; b++) {
        block[b] = [
            puz[y + b][x],
            puz[y + b][x + 1],
            puz[y + b][x + 2]
        ];
    }

    return block;
};

SUDOKU.getPossibleValues = function (row, col) {
    var i = 1;
    var block = this.getBlock(row, col);
    var possibleValues = [];
    for (i = 1; i <= 9; i++) {
        if (!this.existsInRow(i, row)
            && !this.existsInCol(i, col)
            && !this.existsInBlock(i, block)) {
                possibleValues.push(i);
        }
    }

    return possibleValues;
};

SUDOKU.setDefinites = function () {
    var puz = this.puzzle;
    var i = 0, x = 0;
    for (i = 0; i < puz.length; i++) {
        for (x = 0; x < puz[i].length; x++) {
            if (puz[i][x].possibleValues.length === 1) {
                puz[i][x].value = puz[i][x].possibleValues[0];
                puz[i][x].possibleValues = [];
                console.log('set the value to ' + puz[i][x].value);
            }
        }
    }
};

SUDOKU.logPuzzle = function () {
    var puz = this.puzzle;
    var i = 0, x = 0;
    console.log('THE PUZZLE:');
    for (i = 0; i < puz.length; i++) {
        var row = '';
        for (x = 0; x < puz[i].length; x++) {
            if (!puz[i][x].value) {
                row += 'u ';
            } else {
                row += puz[i][x].value + ' ';
            }
        }
        console.log(row);
    }
};

SUDOKU.checkPuzzle();

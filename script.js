
let player1Score = 0;
let player2Score = 0;
let player1;
let player2; 
let turn; 

(function createDisplay() { 
    const grid = document.querySelector('.grid'); 
    for (let i = 0; i < 9;i++) { 
        const card = document.createElement('div');
        card.classList.add('box');
        grid.appendChild(card);
    }
})();

(function choosePlayers() { 
    const pl1 = prompt("What is the name of player 1?"); 
    const name1 = document.querySelector('.name1'); 
    name1.textContent = pl1; 
    
    pl2 = confirm("Are you playing with another person?");
    const name2 = document.querySelector('.name2');
    if (pl2 === false) { 
        name2.textContent = "Bot";
    }
    if (pl2 === true) { 
        const playerName = prompt("What is the name of player 2?");
        name2.textContent = playerName;
    }
})();

function createPlayer(name, sign) { 
    const getName = () => name; 
    const getSign = () => sign;
    return {getName, getSign};
}
function checkWinner(boxes, playerSign) {
    let grid = Array.from(boxes).map(box => box.textContent);

    for (let i = 0; i < 3; i++) {
        if (grid[i * 3] === playerSign && grid[i * 3 + 1] === playerSign && grid[i * 3 + 2] === playerSign) return true;
        if (grid[i] === playerSign && grid[i + 3] === playerSign && grid[i + 6] === playerSign) return true;
    }
    if (grid[0] === playerSign && grid[4] === playerSign && grid[8] === playerSign) return true;
    if (grid[2] === playerSign && grid[4] === playerSign && grid[6] === playerSign) return true;

    return false;
}

function Game() { 
    const sign1 = Math.random() < 0.5? 'X' : 'O';
    const sign2 = (sign1 === 'X') ? 'O' : 'X';

    const name1 = document.querySelector('.name1').textContent;
    player1 = createPlayer(name1, sign1);
    const name2 = document.querySelector('.name2').textContent;
    player2 = createPlayer(name2, sign2);
    turn = (player1.getSign() === 'X') ? 0 : 1;

    const play1 = document.querySelector('.player1');
    const play2 = document.querySelector('.player2');

    play1.style.color = (turn === 0) ? 'green' : 'red';
    play2.style.color = (turn === 1) ? 'green' : 'red';
    alert(player1.getName() + " sign is " + player1.getSign() + '\n' + player2.getName() + " sign is " + player2.getSign());

    const boxes = document.querySelectorAll('.box'); 
    boxes.forEach((box) => {
        box.addEventListener('click', () => {
            const currentPlayer = turn === 0 ? player1 : player2;
            box.textContent = currentPlayer.getSign();

            if (checkWinner(boxes, currentPlayer.getSign())) {
                if(currentPlayer.getName() === player1.getName()) {
                    player1Score++;
                } else if(currentPlayer.getName() === player2.getName()) {
                    player2Score++;
                }
                updateScoreDisplay();
                alert(currentPlayer.getName() + " wins!");
                restartGame();
                return;
            }

            turn = 1 - turn;
            play1.style.color = (turn === 0) ? 'green' : 'red';
            play2.style.color = (turn === 1) ? 'green' : 'red';

                if (player2.getName() === "Bot" && turn === 1) {
                    setTimeout(() => {
                        let index = botMove(boxes, player1.getSign(), player2.getSign());
                        if (index !== null) {
                            boxes[index].click();
                        }
                    }, 500);
                }
        },{once: true});
    });
    if (player2.getName() === "Bot" && turn === 1) {
        setTimeout(() => {
            let index = botMove(boxes, player1.getSign(), player2.getSign());
            if (index !== null) {
                boxes[index].click();
            }
        }, 500);
    }
}

function findWinningMove(boxes, sign, forWin) { 
    const combinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];
    for (let combo of combinations) {
        let [a, b, c] = combo.map(index => boxes[index].textContent);
        if (forWin) {
            if (a === sign && b === sign && !c) return combo[2];
            if (a === sign && !b && c === sign) return combo[1];
            if (!a && b === sign && c === sign) return combo[0];
        }
        else {
            let opponentSign = sign === 'X' ? 'O' : 'X';
            if (a === opponentSign && b === opponentSign && !c) return combo[2];
            if (a === opponentSign && !b && c === opponentSign) return combo[1];
            if (!a && b === opponentSign && c === opponentSign) return combo[0];
        }
    }
    return null;   
}

function findRandomMove(boxes) {
    let availableIndices = [];
    boxes.forEach((box, index) => {
        if (box.textContent === '') availableIndices.push(index);
    });
    if (availableIndices.length === 0) return null;
    return availableIndices[Math.floor(Math.random() * availableIndices.length)];
}

function botMove(boxes, playerSign, botSign) {
    let move = findWinningMove(boxes, botSign, true);
    if (move !== null) return move;

    move = findWinningMove(boxes, playerSign, false);
    if (move !== null) return move;
    if (boxes[4].textContent === '') return 4;

    const corners = [0, 2, 6, 8];
    for (let corner of corners) {
        if (boxes[corner].textContent === '') return corner;
    }

    return findRandomMove(boxes);
}


function updateScoreDisplay() {
    document.querySelector('.player1-score').textContent = "";
    document.querySelector('.player2-score').textContent = "";

    document.querySelector('.player1-score').textContent = player1.getName() +": " + player1Score;
    document.querySelector('.player2-score').textContent = player2.getName() + ": " + player2Score;

}

function restartGame() {
    const grid = document.querySelector('.grid');
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    for (let i = 0; i < 9; i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        grid.appendChild(box);
    }
    Game();

}
Game();
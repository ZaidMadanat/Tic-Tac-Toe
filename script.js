
(function createDisplay() { 
    const grid = document.querySelector('.grid'); 
    for (let i = 0; i < 9;i++) { 
        const card = document.createElement('div');
        card.classList.add('box');
        grid.appendChild(card);
    }
})();

(function choosePlayers() { 
    const player1 = prompt("What is the name of player 1?"); 
    const name1 = document.querySelector('.name1'); 
    name1.textContent = player1; 
    
    const player2 = confirm("Are you playing with another person?");
    const name2 = document.querySelector('.name2');
    if (player2 === false) { 
        name2.textContent = "Bot";
    }
    if (player2 === true) { 
        const playerName = prompt("What is the name of player 2?");
        name2.textContent = playerName;
    }
})();

function createPlayer(name, sign) { 
    const getName = () => name; 
    const getSign = () => sign;
    return {getName, getSign};
}


(function Game() { 
    const sign1 = Math.random() < 0.5? 'X' : 'O';
    const sign2 = (sign1 === 'X') ? 'O' : 'X';

    const name1 = document.querySelector('.name1').textContent;
    const player1 = createPlayer(name1, sign1);
    const name2 = document.querySelector('.name2').textContent;
    const player2 = createPlayer(name2, sign2);
    let turn = (player1.getSign() === 'X') ? 0 : 1;

    const play1 = document.querySelector('.player1');
    const play2 = document.querySelector('.player2');

    play1.style.color = (turn === 0) ? 'green' : 'red';
    play2.style.color = (turn === 1) ? 'green' : 'red';
    alert(player1.getName() + " sign is " + player1.getSign() + '\n' + player2.getName() + " sign is " + player2.getSign());

    const cards = document.querySelectorAll('.box'); 
    cards.forEach((card) => { 
        card.addEventListener('click', (e) => { 
            if(turn === 0) { 
                card.textContent = player1.getSign();
                turn = 1;
                play1.style.color = 'red';
                play2.style.color = 'green';
            }
            else { 
                card.textContent = player2.getSign();
                turn = 0;
                play1.style.color = 'green';
                play2.style.color = 'red';
            }
        },{once: true})
    })
})(); 

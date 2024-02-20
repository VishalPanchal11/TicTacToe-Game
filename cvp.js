let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-button");
let newGameButton = document.querySelector("#new-game-button");
let msg = document.querySelector("#message");
let dialogueBox = document.querySelector(".dialogue-box")
let i=0;
let turnX = true;
const wPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function resetGame(params) {
    for (const box of boxes) {
        box.disabled=false;
        box.innerText="";
        box.classList.remove("o");
    };
    dialogueBox.classList.add("hide");
    turnX = true;
    i=0;
};

newGameButton.addEventListener("click",resetGame);
resetButton.addEventListener("click",resetGame);

// ... (existing code)

function evaluate(board) {
    for (const pattern of wPatterns) {
        let value1 = board[pattern[0]];
        let value2 = board[pattern[1]];
        let value3 = board[pattern[2]];
        if (value1 !== "" && value2 !== "" && value3 !== "") {
            if (value1 === value2 && value2 === value3) {
                return value1 === "O" ? 1 : -1;
            }
        }
    }
    return 0; // It's a tie
}

function minimax(board, depth, isMaximizing) {
    const score = evaluate(board);

    if (score !== 0) {
        return score;
    }

    if (depth === 0) {
        return 0; // Limit the depth of the search
    }

    if (isMaximizing) {
        let bestScore = -10000;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = "O";
                bestScore = Math.max(bestScore, minimax(board, depth - 1, false));
                board[i] = "";
            }
        }
        return bestScore;
    } else {
        let bestScore = 10000;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = "X";
                bestScore = Math.min(bestScore, minimax(board, depth - 1, true));
                board[i] = "";
            }
        }
        return bestScore;
    }
}

function computerTurn() {
    let bestScore = -10000;
    let bestMove;

    for (let i = 0; i < 9; i++) {
        if (boxes[i].innerText === "") {
            boxes[i].innerText = "O";
            let score = minimax(getBoardState(), 2, false); // You can adjust the depth
            boxes[i].innerText = "";
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    boxes[bestMove].innerText = "O";
    boxes[bestMove].disabled = true;
    i++;
    console.log(i);
    checkW();
    
}

function getBoardState() {
    return Array.from(boxes).map((box) => box.innerText);
}

// ... (remaining code)


boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        box.innerText="X";
        box.disabled=true;
        i++;
        console.log(i);
        checkW();
        
        computerTurn();
    });
});

function checkW() {
    for (const pattern of wPatterns) {
        let value1 = boxes[pattern[0]].innerText;
        let value2 = boxes[pattern[1]].innerText;
        let value3 = boxes[pattern[2]].innerText;
        if (value1!="" && value2!="" && value3!="") {
        //   if (value1===value2 && value2===value3) {
        //     console.log(`WINNER : ${value1}`);
        //     showWinner(value1);
        //   };
        if (value1===value2 && value2===value3) {
            console.log(`WINNER : ${value1}`);
             showWinner(value1);
        } else {
            tie();
        }
        };
    };
};

function tie() {
    if (i == 9) {
        msg.innerText = `Its a Tie !!`;
        dialogueBox.classList.remove("hide");
        for (const box of boxes) {
            box.disabled = true;
        };
        i = 0;
    };

};

const showWinner = (winner) =>{
    if (winner=="X") {
        msg.innerText = `Congratulations, You Won !!`;
    } else {
        msg.innerText = `Better luck next time !!`;
    };
    dialogueBox.classList.remove("hide");
    for (const box of boxes) {
        box.disabled=true;
    };
   };
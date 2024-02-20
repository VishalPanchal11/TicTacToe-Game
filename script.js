let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-button");
let newGameButton = document.querySelector("#new-game-button");
let msg = document.querySelector("#message");
let dialogueBox = document.querySelector(".dialogue-box")
let i = 0;
let turnX = true;
const wPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function resetGame(params) {
    for (const box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("o");
    };
    dialogueBox.classList.add("hide");
    turnX = true;
    i=0;
};

newGameButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX) {
            box.innerText = "X";
            turnX = false;
        } else {
            box.innerText = "O";
            box.classList.add("o");
            turnX = true;
        };
        box.disabled = true;
        i++;
        checkW();
        tie();
    });
});

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

function checkW() {
    for (const pattern of wPatterns) {
        let value1 = boxes[pattern[0]].innerText;
        let value2 = boxes[pattern[1]].innerText;
        let value3 = boxes[pattern[2]].innerText;
        if (value1 != "" && value2 != "" && value3 != "") {
            if (value1 === value2 && value2 === value3) {
                console.log(`WINNER : ${value1}`);
                showWinner(value1);
            };
        };
    };
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner} !!`;
    dialogueBox.classList.remove("hide");
    for (const box of boxes) {
        box.disabled = true;
    };
};
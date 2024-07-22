let boxes = document.querySelectorAll(".box");
let reset =  document.querySelector("#reset");
let newGame = document.querySelector("#new-game");
let msgCon = document.querySelector(".msg-con");
let msg = document.querySelector("#msg");

let turnX = true;
let count = 0;

const winPatterns = [
    [0,1,2],[0,3,6],[0,4,8],
    [1,4,7],[2,5,8],[2,4,6],
    [3,4,5],[6,7,8],
];

const resetGame =  () => {
    turnX = true;
    enableBoxes();
    msgCon.classList.add("hide");
}

const drawGame = () => {
    msg.innerText = `Congratulation, Game was draw`;
    msgCon.classList.remove("hide");
    disableBoxes();
};

boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        console.log("box clicked");
        if (turnX) {
            box.innerHTML = "X";
            box.style.backgroundColor = "brown";
            turnX = false;
        } else {
            box.innerHTML = "O";
            box.style.backgroundColor = "violet";
            turnX = true;
        }
        box.disabled = true;
        count++;

        let winnerFound = checkWinner();

        if(count == 9 && winnerFound == false){
            drawGame();
        }
    });
});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    };
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "rgb(5, 31, 81)";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulation, Winner is "${winner}"`;
    msgCon.classList.remove("hide");
    disableBoxes();
};


const checkWinner = () => {
    for (let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != "" ){
            if( pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
                return true;
            }
        }
    }
};

reset.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);
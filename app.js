let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO=true;
let count = 0;

const winPatterns=[
    [0, 1, 2],[3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");

};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText="O";
            box.style.color = "#ff7272";
            turnO=false;
        }
        else{
            box.innerText="X";
            box.style.color = "#71eeff";
            turnO=true;
        }
        box.disable=true;
        count++;

        let isWinner = checkWinner();
        
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = "Game Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disable = true;
    });
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disable = false;
    });
}

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

const showWinner = (winner) => {
    msg.innerText = `${winner} is the winner!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

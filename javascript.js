const buttons = Array.from(document.querySelector(".buttons").childNodes);
const playerScoreElement = document.querySelector(".player_score");
const computerScoreElement = document.querySelector(".comp_score");
const result = document.querySelector(".result");
const resultDescription = document.querySelector(".result_description");
const dialog = document.querySelector("dialog");

let playerScore = 0;
let computerScore = 0;

playerScoreElement.textContent = playerScore;
computerScoreElement.textContent = computerScore;

buttons.forEach(button => {
    if (button.nodeName == "BUTTON") {
        button.addEventListener("click", e => {
            const player = button.className;
            const computer = getComputerSelection();

            if (player == computer) {
                result.textContent = "Tied!";
                resultDescription.textContent = `Both are ${String(player).charAt(0).toUpperCase() + String(player).slice(1)}`;
            } else {
                declareRoundWinner(player, computer);
                if (playerScore == 5 || computerScore == 5)
                    resetGame((playerScore == 5) ? "Player" : "Computer");
            }
        });
    }
});

dialog.lastElementChild.addEventListener("click", () => {
    dialog.style.display = "none";
    dialog.close();
});

function getComputerSelection() {
    const selection = Math.round(Math.random() * 10) % 3;
    return (selection == 0) ? "rock" : (selection < 2) ? "paper" : "scissors";
}

function declareRoundWinner(player, computer) {
    if (player == "rock") {
        if (computer == "paper")
            updateComputerScore(player, computer);
        else
            updatePlayerScore(player, computer);
    } else if (player == "paper") {
        if (computer == "rock")
            updatePlayerScore(player, computer);
        else
            updateComputerScore(player, computer);
    } else {
        if (computer == "rock")
            updateComputerScore(player, computer);
        else
            updatePlayerScore(player, computer);
    }
}

function updatePlayerScore(player, computer) {
    playerScoreElement.textContent = ++playerScore;
    result.textContent = "You win!";
    resultDescription.textContent = `${String(player).charAt(0).toUpperCase() + String(player).slice(1)} beats ${String(computer).charAt(0).toUpperCase() + String(computer).slice(1)}`;
}

function updateComputerScore(player, computer) {
    computerScoreElement.textContent = ++computerScore;
    result.textContent = "You lose!";
    resultDescription.textContent = `${String(computer).charAt(0).toUpperCase() + String(computer).slice(1)} beats ${String(player).charAt(0).toUpperCase() + String(player).slice(1)}`;
}

function resetGame(winner) {
    dialog.style.display = "flex";
    dialog.firstChild.textContent = `${winner} wins!`;
    dialog.showModal();

    playerScore = 0;
    computerScore = 0;
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
    result.textContent = "";
    resultDescription.textContent = "";
}
let rounds;
let currentRound = 1;
let playerScore = 0;
let computerScore = 0;
let gameRunning = true;

function playRound(playerSelection, computerSelection) {
    let win;
    playerSelection = String(playerSelection).charAt(0).toUpperCase() + String(playerSelection).slice(1).toLowerCase();

    if (playerSelection == "Null")
        return "Game aborted!";

    while (!isInputValid(playerSelection)) {
        playerSelection = prompt("Invalid input\nRock, Paper, Scissors?");
    }

    if (playerSelection == computerSelection)
        return `It's a tie! Both are ${playerSelection}`;

    if (playerSelection == "Rock") {
        win = (computerSelection == "Paper") ? false : true;
    } else if (playerSelection == "Paper") {
        win = (computerSelection == "Rock") ? true : false;
    } else {
        win = (computerSelection == "Rock") ? false : true;
    }

    playerScore += (win) ? 1 : 0;
    computerScore += (!win) ? 1 : 0;

    return (win) ? `You win! ${playerSelection} beats ${computerSelection}` : `You lose! ${computerSelection} beats ${playerSelection}`;
}

function isInputValid(input) {
    return (input == "Rock") ? true : (input == "Paper") ? true : (input == "Scissors") ? true : false;
}

function isRoundsValid(input) {
    return (input > 0) ? true : false;
}

function getComputerChoice() {
    const selection = Math.round(Math.random() * 10) % 3;
    return (selection < 1) ? "Rock" : (selection < 2) ? "Paper" : "Scissors";
}

function playGame() {
    while (!isRoundsValid(rounds = Number(prompt("How many rounds do you want to play?"))));

    while (gameRunning) {
        console.log(`Round ${currentRound++}: ` + playRound(prompt("Rock, Paper, Scissors?"), getComputerChoice()));
        gameRunning = (currentRound > rounds) ? false : true;
    }

    console.log(`Score: Player: ${playerScore} - Computer: ${computerScore} (${(playerScore == computerScore) ? "No one" : (playerScore > computerScore) ? "Player" : "Computer"} wins!)`);
}

playGame(5);
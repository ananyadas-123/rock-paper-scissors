
// Select HTML elements

const container = document.querySelector(".container");

const weaponBox = document.querySelector(".weapon-box");

const weapons = document.querySelectorAll(".weapons div");

const playerChoicesBox = document.querySelector(".player-choices");

const player = document.querySelector(".player-choice img");

const computer = document.querySelector(".computer-choice img");

const resultBox = document.querySelector(".result-box");

const resultTxt = resultBox.querySelector("h3");

const playAgainBtn = document.querySelector(".play-again");

const wonValueTxt = document.querySelector(".won span");

const lostValueTxt = document.querySelector(".lost span");

const drawValueTxt = document.querySelector(".draw span");


// Initialize score

let won = 0;
let lost = 0;
let draw = 0;


// Computer choices

const computerChoices = ["Rock", "Paper", "Scissors"];


// Image path function

function getImage(choice) {
    return `images/${choice}.png`;
}


// Game state

let isPlaying = false;


// Weapon selection event

weapons.forEach((weapon) => {

    weapon.addEventListener("click", () => {

        // Prevent multiple clicks

        if (isPlaying) return;

        isPlaying = true;

        // Get selected weapon

        const userChoice = weapon.dataset.choice;

        // Generate random computer choice

        const randomIndex = Math.floor(
            Math.random() * computerChoices.length
        );

        const computerChoice = computerChoices[randomIndex];


        // Set initial images

        player.src = getImage("Rock");

        computer.src = getImage("Rock");


        // Hide weapon selection

        weaponBox.style.display = "none";

        // Show player and computer choices

        playerChoicesBox.style.display = "block";

        playerChoicesBox.classList.add("active");


        // Reveal choices after 2 seconds

        setTimeout(() => {

            // Stop animation

            playerChoicesBox.classList.remove("active");


            // Show actual images

            player.src = getImage(userChoice);

            computer.src = getImage(computerChoice);


            // Determine winner

            let result;

            if (userChoice === computerChoice) {

                result = "Draw";

            } else if (

                (userChoice === "Rock" && computerChoice === "Scissors") ||

                (userChoice === "Paper" && computerChoice === "Rock") ||

                (userChoice === "Scissors" && computerChoice === "Paper")

            ) {

                result = "You";

            } else {

                result = "Computer";

            }


            // Show result

            showResult(result);

            isPlaying = false;

        }, 2000);

    });

});


// Show game result

function showResult(result) {

    resultBox.style.display = "block";


    if (result === "You") {

        resultTxt.innerHTML = "Congrats, You Won! 🎉";

        won++;

        wonValueTxt.textContent = won;

    } else if (result === "Computer") {

        resultTxt.textContent = "You Lost! 😢";

        lost++;

        lostValueTxt.textContent = lost;

    } else {

        resultTxt.textContent = "Match Draw! 🤝";

        draw++;

        drawValueTxt.textContent = draw;

    }

}


// Play Again button

playAgainBtn.addEventListener("click", () => {

    // Hide result

    resultBox.style.display = "none";


    // Hide player choices

    playerChoicesBox.classList.remove("active");

    playerChoicesBox.style.display = "none";


    // Reset images

    player.src = getImage("Rock");

    computer.src = getImage("Rock");


    // Show weapon selection

    weaponBox.style.display = "block";


    // Reset game state

    isPlaying = false;

});

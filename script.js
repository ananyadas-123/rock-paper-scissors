let container=document.querySelector(".container");
let weaponBox=container.querySelector(".weapon-box");
let playerChoicesBox=container.querySelector(".player-choices");
let weapons=weaponBox.querySelectorAll(".weapons div");
let player=playerChoicesBox.querySelector(".player-choice img");
let computer=playerChoicesBox.querySelector(".computer-choice img");
let resultBox=container.querySelector(".result-box");
let resultTxt=resultBox.querySelector("h3");
let playAgainBtn=resultBox.querySelector("button");
let wonValueTxt=document.querySelector(".score-box .won h3 span");
let lostValueTxt=document.querySelector(".score-box .lost h3 span");
let drawValueTxt=document.querySelector(".score-box .draw h3 span");

//Initialize the scores
let won= 0, lost=0, draw=0;

//Define the computer possible choices
let computerChoices=["Rock","Paper","Scissors"];

//Define the possible outcome of the game
let outcomes={
    RockRock: "Draw",
    RockPaper: "Computer",
    RockScissors: "You",
    PaperPaper: "Draw",
    PaperRock: "You",
    PaperScissors: "Computer",
    ScissorsScissors: "Draw",
    ScissorsRock: "Computer",
    ScissorsPaper: "You"
}


//Add event listener to the weapon choice
for(let i=0;i<weapons.length;i++){
    weapons[i].addEventListener("click",(e)=>{

        //Set the revealing hands to rock
        player.src="images/Rock.png";
        computer.src="images/Rock.png";

        //Hide the weapon box and show the player choices
        weaponBox.style.display="none";
        playerChoicesBox.style.display="block";

        //Add a delay before showing the player choices
        setTimeout(()=>{
            playerChoicesBox.classList.add("active");
        },1000);

        setTimeout(()=>{
            //Pause the animation of revealing hands after 3 seconds
            let playerChoices=playerChoicesBox.querySelectorAll("div");
            for(let i=0;i<playerChoices.length;i++){
                playerChoices[i].style.animationPlayState="paused";
            }

            //Set the player choice to the selected weapon
            player.src=e.target.src;

            //Generate a random computer choice
            let randomChoice=computerChoices[Math.floor(Math.random()*computerChoices.length)];
            computer.src=`images/${randomChoice}.png`;

            //Get the user choice and random choice to determine the outcome
            let userChoice=e.target.parentElement.className;
            let outcomeValue=outcomes[userChoice+randomChoice];

            //Show the result
            showResult(outcomeValue);

        },3000);

    })
}

//Function to show the result of the game
let showResult=(result)=>{

    //Show the result box and set the container height
    container.style.height="415px";
    resultBox.style.display="block";

    //Update the result text
    if(result==="You"){
        resultTxt.innerHTML="Congrats, You Won! &#x1F389;";
        won++;
        wonValueTxt.innerHTML=won;
    }
    else if(result==="Computer"){
        resultTxt.innerHTML="You Lost!";
        lost++;
        lostValueTxt.innerHTML=lost;
    }
    else{
        resultTxt.innerHTML="Match Draw!";
        draw++;
        drawValueTxt.innerHTML=draw;
    }
}

//Add event listener to the play again button
playAgainBtn.addEventListener("click",()=>{
    //Reset the game state
    playerChoicesBox.classList.remove("active");
    container.style.height="380px";
    resultBox.style.display="none";
    weaponBox.style.display="block";
    playerChoicesBox.style.display="none";

    //Resume the animation on the revealing hands when player choices his weapon
    let playerChoices=playerChoicesBox.querySelectorAll("div");
    for(let i=0;i<playerChoices.length;i++){
        playerChoices[i].style.animationPlayState="running";
    }
})

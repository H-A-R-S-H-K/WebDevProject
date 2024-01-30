let title = document.querySelector("#level-title");
let container = document.querySelector(".container");
let colors = ["green", "blue", "yellow", "red"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let index = 0;
let gameOn = false;

document.addEventListener("keydown", function() {
    if (level == 0) {
        level++;
        gameOn = true;
        nextSequence();
    }
})

container.addEventListener("click", function(e) {
    if(e.target.attributes[0].value == 'button' && gameOn) {
        let color = e.target.classList[0];
        e.target.classList.add('pressed');
        playSound(color);
        setTimeout(() => {
            e.target.classList.remove('pressed');
        }, 100) 
        userPattern.push(color);
        console.log(userPattern + " User");
        if (userPattern[index] == gamePattern[index]) {
            index++;
            if (index == gamePattern.length) {
                userPattern = [];
                index = 0;
                level++;
                setTimeout(() => {
                    nextSequence();;
                }, 300) 
            }
        }
        else {
            title.innerText = 'Game Over!!!';
            gameOn = false;
            playSound("wrong");
            gamePattern = [];
            userPattern = [];
            index = 0;
            setTimeout(() => {
                level = 0;
                title.innerText = 'Press any key to restart again';
            }, 2000);
        }
    }
})


function nextSequence() {
    title.innerText = "Level " + level;
    let randomNumber = Math.floor(Math.random() * 4);
    let color = colors[randomNumber];
    gamePattern.push(color);
    console.log(gamePattern + " Game");
    document.querySelector('.' + color).animate(
        [
            {opacity: 0},
            {opacity: 1},
        ],
        {duration: 500,
        iterations: 1}
    );
    playSound(color);
}

function playSound(color) {
    var audio = new Audio('./assets/' + color + '.mp3');
    audio.play();
}
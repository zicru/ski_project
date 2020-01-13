let numbers = document.querySelectorAll('.number'),
    numbersResults = [];

numbers.forEach(number => {
    number.addEventListener('click', function () {
        processNumberClick(this);
    });
});

function processNumberClick(numberElement) {
    let numberValue = parseInt(numberElement.innerHTML);

    if (isSmallestNotClicked(numberValue)) {
        numbersResults.forEach(number => {
            if (number.value === numberValue) {
                number.pressed = true;
                numberElement.classList.add('active');
            }
        });
    } else {
        numberElement.classList.add('wrong');
        setTimeout(() => {
            numberElement.classList.remove('wrong');
        }, 400);
    }
}

function chooseNumbersForGame(minNumber, maxNumber) {
    numbers.forEach(number => {
        let numberValue = Math.round((Math.random() * ( maxNumber - minNumber )) + minNumber); // get a number from 100 to 999, to make it more fun

        number.innerHTML = "" + numberValue;
        numbersResults.push({
            value: numberValue,
            pressed: false
        });
    });
}

function isSmallestNotClicked(number) {
    for (let i = 0; i < numbersResults.length; i++) {
        if (!numbersResults[i].pressed && number > numbersResults[i].value) {
            return false;
        }
    }

    return true;
}

function startGame(readyTimer = 3, gameTimer = 10) {
    numbersResults = [];
    chooseNumbersForGame(1, 999);
    document.querySelector('.game-board').style.display = 'block';

    let startGameCountdownElement = document.querySelector('.starting-timer'),
        startingTimerDialog = document.querySelector('.starting-timer-dialog'),
        secondsElement = document.querySelector('.seconds'),
        scoreModal = document.querySelector('.score-modal');

    if (scoreModal.classList.contains('active')) {
        scoreModal.classList.remove('active');
    }

    startGameCountdownElement.innerHTML = readyTimer;
    startingTimerDialog.classList.add('active');

    secondsElement.innerHTML = gameTimer;

    let gameStartIntervalCounter = setInterval(() => {
        let timeUntilStart = parseInt(startGameCountdownElement.innerHTML);

        timeUntilStart -= 1;

        if (timeUntilStart <= 0) {
            clearInterval(gameStartIntervalCounter);
            timeUntilStart = readyTimer;
            startingTimerDialog.classList.remove('active');
        }

        startGameCountdownElement.innerHTML = timeUntilStart;
    }, 1000);

    let gameStartCountdown = setTimeout(() => {
        let showTimeLeftInterval = setInterval(() => {
            let secondsLeft = parseInt(secondsElement.innerHTML);
    
            secondsLeft -= 1;
    
            if (secondsLeft <= 0) {
                clearInterval(showTimeLeftInterval);
                secondsLeft = gameTimer;
            }
            secondsElement.innerHTML = secondsLeft;
        }, 1000);
        let gameTime = setTimeout(() => {
            endGame();
        }, gameTimer * 1000);
    }, readyTimer * 1000);    
}

function endGame() {
    document.querySelector('.game-board').style.display = 'none';

    let finalScore = 0;
    numbers.forEach(element => {
       element.classList.remove('active');
    });
    numbersResults.forEach(number => {
       if (number.pressed) {
           finalScore++;
       }
    });

    activateScoreModal(finalScore);
}

function activateScoreModal(finalScore) {
    let scoreModal = document.querySelector('.score-modal'),
        finalScoreElement = document.querySelector('#final-score');

    finalScoreElement.innerHTML = finalScore;
    scoreModal.classList.add('active');
}

function hideScoreModal() {
    let scoreModal = document.querySelector('.score-modal');

    scoreModal.classList.remove('active');
}




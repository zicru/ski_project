let numbers = document.querySelectorAll('.number'),
    numbersResults = [];

// TODO: Maybe go with choosing 5 single digit, 5 dual digit numbers, 6 tri digit numbers

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
        let numberValue = Math.round((Math.random() * ( maxNumber - minNumber )) + minNumber);

        number.innerHTML = "" + numberValue;
        numbersResults.push({
            value: numberValue,
            pressed: false
        });
    });
}

function chooseNumbersForGameV2() {
    let activeIteration = 0,
        numberRanges = [
            {
                "iterations": 2,
                "numbers" : {
                    "from": 1,
                    "to": 9
                }
            },
            {
                "iterations": 4,
                "numbers" : {
                    "from": 10,
                    "to": 99
                }
            },
            {
                "iterations": 10,
                "numbers" : {
                    "from": 100,
                    "to": 999
                }
            },
        ];

    numbers.forEach(number => {
        let numberOfIterations = numberRanges[activeIteration].iterations;

        if (numberOfIterations < 1) {
            activeIteration += 1;
        }

        let chosenNumber;
        do {
            chosenNumber = chooseNumberInRange(numberRanges[activeIteration].numbers.from, numberRanges[activeIteration].numbers.to);
        } while (isAlreadyChosen(chosenNumber));

        numbersResults.push({
            value: chosenNumber,
            pressed: false
        });

        number.innerHTML = "" + chosenNumber;
        numberRanges[activeIteration].iterations -= 1;
    });
}

function chooseNumberInRange(min, max) {
    return Math.round((Math.random() * ( max - min )) + min);
}

function isAlreadyChosen(number) {
    for (let i = 0; i < numbersResults.length; i++) {
        let numberValue = numbersResults[i].value;

        if (numberValue === number) {
            return true;
        }
    }
    return false;
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
    chooseNumbersForGameV2();
    // chooseNumbersForGame(1, 999);
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




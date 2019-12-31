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
    }
}

function chooseNumbersForGame() {
    numbers.forEach(number => {
        let numberValue = Math.round((Math.random() * ( 999 - 100 )) + 100); // get a number from 100 to 999, to make it more fun

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

function startGame() {
    numbersResults = [];
    chooseNumbersForGame();
    document.querySelector('.game-field').style.display = 'flex';

    let showTimeLeftInterval = setInterval(() => {

    });
    let gameTime = setTimeout(() => {
        endGame();
    }, 10000);
}

function endGame() {
    document.querySelector('.game-field').style.display = 'none';

    let finalScore = 0;
    numbers.forEach(element => {
       element.classList.remove('active');
    });
    numbersResults.forEach(number => {
       if (number.pressed) {
           finalScore++;
       }
    });
    alert(`Vas rezultat: ${finalScore}`);
}


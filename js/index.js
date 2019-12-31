let umotvorineElement = document.querySelector(".umotvorine"),
    umotvorine = [
        "Ako je neko lud, ne budi mu drug.",
        "Gvožđe se kuje dok je vruće.",
        "Ko drugome jamu kopa, sam u nju upada.",
        "Ko laže za tebe, lagaće i protiv tebe.",
        "Ko mnogo priča, ili sve zna, ili sve laže."
    ],
    lastUmotvorinaIndex;

function updateUmotvorina() {
    let umotvorinaIndex = getRandomUmotvorinaIndex();
    lastUmotvorinaIndex = umotvorinaIndex;

    umotvorineElement.innerHTML = `<h1 class="umotvorine-heading"><span id="word"></span> <span class="typing-indicator"></span></h1>`;

    writeUmotvorina(umotvorine[umotvorinaIndex]);
}

function writeUmotvorina(wordToWrite) {
    let letters = wordToWrite.split(""),
        intervalTime = 6500 / letters.length,
        index = 0;

    let writingInterval = setInterval(() => {
        document.querySelector('#word').innerHTML += letters[index];
        index++;

        if (index === letters.length) {
            clearInterval(writingInterval);
        }
    }, intervalTime);
}

function getRandomUmotvorinaIndex() {
    let index;

    do {
        index = Math.round(Math.random() * 4);
    } while (index === lastUmotvorinaIndex);

    return index;
}

updateUmotvorina();
let umotvorineInterval = setInterval(updateUmotvorina, 10 * 1000);
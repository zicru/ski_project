let umotvorineElement = document.querySelector(".umotvorine"),
    umotvorine = [
        "Ako je neko lud, ne budi mu drug.",
        "Gvožđe se kuje dok je vruće.",
        "Ko drugome jamu kopa, sam u nju upada.",
        "Ko laže za tebe, lagaće i protiv tebe.",
        "Ko mnogo priča, ili sve zna, ili sve laže."
    ];

function updateUmotvorina() {
    let umotvorinaIndex = Math.round(Math.random() * 4);

    console.log(umotvorinaIndex);
    umotvorineElement.innerHTML = umotvorine[umotvorinaIndex];
}

updateUmotvorina();
let umotvorineInterval = setInterval(updateUmotvorina, 10 * 1000);
let activeSheet = 0,
    nextPageControllers = document.querySelectorAll('.menu-page.front .flip-page'),
    previousPageControllers = document.querySelectorAll('.menu-page.back .flip-page');

nextPageControllers.forEach(controller => {
    controller.addEventListener('click', flipToNextPage);
});

previousPageControllers.forEach(controller => {
    controller.addEventListener('click', flipToPreviousPage);
});


document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
        flipToPreviousPage();
    } else if (e.key === 'ArrowRight') {
        flipToNextPage();
    }
});

function flipToNextPage() {
    let allSheets = document.querySelectorAll('.menu-sheet'),
        pagesFlipping = document.querySelectorAll('.flipping').length;

    if (activeSheet >= allSheets.length - 2 || pagesFlipping) {
        return false;
    }

    allSheets[activeSheet].classList.remove('active');

    activeSheet += 1;

    allSheets[activeSheet].classList.remove('right');
    allSheets[activeSheet].classList.add('flipping');
    allSheets[activeSheet].classList.add('left');

    allSheets[activeSheet+1].classList.add('active');

    setTimeout(function () {
        allSheets[activeSheet].classList.remove('flipping');
    }, 500);
}

function flipToPreviousPage() {
    let allSheets = document.querySelectorAll('.menu-sheet'),
        pagesFlipping = document.querySelectorAll('.flipping').length;

    if (activeSheet <= 0 || pagesFlipping) {
        return false;
    }

    activeSheet -= 1;

    allSheets[activeSheet + 2].classList.remove('active');
    // allSheets[activeSheet + 2].style.zIndex = '3';

    allSheets[activeSheet + 1].classList.remove('left');
    allSheets[activeSheet + 1].classList.add('flipping');
    allSheets[activeSheet + 1].classList.add('right');

    allSheets[activeSheet].classList.add('active');

    setTimeout(function () {
        allSheets[activeSheet + 1].classList.remove('flipping');
        // allSheets[activeSheet + 2].style.zIndex = null;
    }, 500);
}
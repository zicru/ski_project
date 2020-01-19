let wheelMovesCountToChangeZoom = 5,
    zoomLevel = 10,
    wheelMovesCount = 0,
    maxZoomLevel = 15,
    minZoomLevel = 4,
    photos = [
        '1.jpg', '2.jpg', '3.jpeg', '4.jpg', '5.jpg', '6.jpeg', '7.jpg', '8.jpg', '9.jpg',
        '10.jpg', '11.jpg', '12.jpg', '13.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg',
        '1.jpg', '2.jpg', '3.jpeg', '4.jpg', '5.jpg', '6.jpeg', '7.jpg', '8.jpg', '9.jpg',
        '10.jpg', '11.jpg', '12.jpg', '13.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg',
        '1.jpg', '2.jpg', '3.jpeg', '4.jpg', '5.jpg', '6.jpeg', '7.jpg', '8.jpg', '9.jpg',
        '10.jpg', '11.jpg', '12.jpg', '13.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg',
        '1.jpg', '2.jpg', '3.jpeg', '4.jpg', '5.jpg', '6.jpeg', '7.jpg', '8.jpg', '9.jpg',
        '10.jpg', '11.jpg', '12.jpg', '13.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg',
    ],
    zoomControlInput = document.querySelector('#zoomLevel'),
    closeModalButton = document.querySelector('#close-modal');


zoomControlInput.addEventListener('input', zoomControlInputHandler);
closeModalButton.addEventListener('click', closeModalButtonHandler)
// Max and min zoom levels mean that there's that number of pictures in the gallery

arrangeGalleryGrid();
window.addEventListener('wheel', function (event) {
    if (event.ctrlKey) {
        let zoomIn = event.wheelDelta > 0;
        changeZoomLevel(zoomIn);
    }
});


function changeZoomLevel(shouldZoomIn) {
    if (shouldZoomIn && zoomLevel > minZoomLevel) {
        zoomIn();
        updateGalleryGrid();
    } else if (zoomLevel <= maxZoomLevel) {
        zoomOut();
        updateGalleryGrid();
    }
}

function zoomIn() {
    zoomLevel -= 1;
    updateSlider(zoomLevel);
}

function zoomOut() {
    zoomLevel += 1;
    updateSlider(zoomLevel);
}

function arrangeGalleryGrid() {
    let galleryContainer = document.querySelector('.gallery-content'),
        imageDimension = window.innerWidth / zoomLevel,
        columnPlacement = 0,
        rowPlacement = 0;

    galleryContainer.innerHTML = '';

    photos.forEach((photo, index) => {
        let positionTop = imageDimension * rowPlacement,
            positionLeft = imageDimension * columnPlacement;

        galleryContainer.innerHTML += getImageWithProperties(photo, imageDimension, positionTop, positionLeft);

        columnPlacement++;
        if (columnPlacement === zoomLevel) {
            columnPlacement = 0;
            rowPlacement++;
        }
    });

    bindGalleryImageEvents();
}

function updateGalleryGrid() {
    let imageDimension = window.innerWidth / zoomLevel,
        columnPlacement = 0,
        rowPlacement = 0,
        existingPhotos = document.querySelectorAll('.gallery-content img');

    existingPhotos.forEach((photo, index) => {
        let positionTop = imageDimension * rowPlacement,
            positionLeft = imageDimension * columnPlacement;

        photo.style.top = `${positionTop}px`;
        photo.style.left = `${positionLeft}px`;

        photo.style.width = `${imageDimension}px`;
        photo.style.height = `${imageDimension}px`;

        columnPlacement++;
        if (columnPlacement === zoomLevel) {
            columnPlacement = 0;
            rowPlacement++;
        }
    });
}

function getImageWithProperties(imgUrl, imageDimension, positionTop, positionLeft) {
    return `
        <img class="gallery-image" src="../img/gallery/${imgUrl}" style="height: ${imageDimension}px; width: ${imageDimension}px; left: ${positionLeft}px; top: ${positionTop}px"/>
    `;
}

function bindGalleryImageEvents() {
    let galleryImages = document.querySelectorAll('.gallery-content img');

    galleryImages.forEach(image => {
        image.addEventListener('click', openImageModal);
    });
}

function openImageModal() {
    let viewPortOffset = this.getBoundingClientRect(),
        positionTop = viewPortOffset.top,
        positionLeft = viewPortOffset.left,
        imageDimensions = this.style.width,
        modalImage = document.querySelector('#modal-image'),
        modalImageContainer = document.querySelector('.image-modal-container');

    this.classList.add('active');

    modalImageContainer.style.display = 'block';

    modalImage.src = this.src;
    modalImage.style.display = 'block';

    modalImage.style.width = imageDimensions;
    modalImage.style.height = imageDimensions;
    modalImage.style.top = positionTop + "px";
    modalImage.style.left = positionLeft + "px";

    setTimeout(function() {
        modalImage.style.width = window.innerHeight - 100 + 'px';
        modalImage.style.height = window.innerHeight - 100 + 'px';
        modalImage.style.top = '50px';
        modalImage.style.left = (window.innerWidth - (window.innerHeight - 100)) / 2 + 'px';
    },1);

    setTimeout(function() {
        closeModalButton.style.top = '50px';
        closeModalButton.style.right = (window.innerWidth - (window.innerHeight - 100)) / 2 + 'px';
        closeModalButton.style.display = 'flex';
    }, 250);
}

function updateIndicator(value) {
    let zoomLevelIndicator = document.querySelector('#zoomLevelIndicator');
    zoomLevelIndicator.innerHTML = `${value}`;
}

function updateSlider(newZoomLevel) {
    let zoomLevelSlider = document.querySelector('#zoomLevel');
    zoomLevelSlider.value = newZoomLevel * 10;
    updateIndicator(newZoomLevel);
}

function closeModalButtonHandler() {
    let modalImage = document.querySelector('#modal-image'),
        originalImage = document.querySelector('.gallery-image.active'),
        imageDimensions = originalImage.width,
        viewportOffset = originalImage.getBoundingClientRect(),
        positionTop = viewportOffset.top,
        positionLeft = viewportOffset.left,
        modalImageContainer = document.querySelector('.image-modal-container');

    closeModalButton.style.top = '0px';
    closeModalButton.style.right = '0px';
    closeModalButton.style.display = 'none';

    modalImage.style.width = imageDimensions + 'px';
    modalImage.style.height = imageDimensions + 'px';
    modalImage.style.top = positionTop + "px";
    modalImage.style.left = positionLeft + "px";

    setTimeout(function() {
        originalImage.classList.remove('active');
        modalImage.src = '#';
        modalImage.style.display = 'none';
        modalImageContainer.style.display = 'none';
    }, 250);
}

function zoomControlInputHandler() {
    let newZoomLevel = Math.round(this.value / 10);

    zoomLevel = newZoomLevel;
    updateIndicator(zoomLevel);
    updateGalleryGrid();
}























let orderForm = document.querySelector('#order-form'),
    buildingCheckbox = document.querySelector('#isBuilding'),
    closeMenuButton = document.querySelector('.close-modal');

orderForm.addEventListener('submit', processOrderSubmission);
buildingCheckbox.addEventListener('input', toggleBuildingNumberVisibility);
closeMenuButton.addEventListener('click', closeOrderMenu);

function closeOrderMenu() {
    let orderModal = document.querySelector('.order-modal');

    orderModal.classList.remove('active');
}

function toggleBuildingNumberVisibility() {
    let apartmentNumberContainer = document.querySelector('.aptNumber'),
        apartmentNumberInput = document.querySelector('.aptNumber #aptNumber');

    if (this.checked) {
        apartmentNumberContainer.classList.add('active');
        apartmentNumberInput.required = true;
    } else {
        apartmentNumberContainer.classList.remove('active');
        apartmentNumberInput.required = false;
    }
}

function processOrderSubmission(event) {
    event.preventDefault();

    let validationResult = validateForm();

    if (validationResult) {
        window.location.href = "helper/order-complete.html";
    }
}

function validateForm() {

    let formElements = document.querySelectorAll('#order-form input:not([type="checkbox"])');

    console.log(formElements);

    return false;
}


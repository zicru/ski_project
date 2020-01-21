let orderForm = document.querySelector('#order-form'),
    buildingCheckbox = document.querySelector('#isBuilding'),
    closeMenuButton = document.querySelector('.close-modal'),
    orderFood = document.querySelector('#finish-choosing'),
    allMeals = document.querySelectorAll('.meal'),
    mealsData = [
        {
            name: "Sendvič sa piletinom",
            price: 4.60
        },
        {
            name: "Sendvič sa kačkavaljem",
            price: 3.25
        },
        {
            name: "Pizza",
            price: 4.60
        },
        {
            name: "Biftek",
            price: 36.90
        },
        {
            name: "Sushi",
            price: 10.45
        },
        {
            name: "Pasta",
            price: 4.95
        },
        {
            name: "Supa",
            price: 3.45
        },
        {
            name: "Burger",
            price: 10.00
        },
        {
            name: "Engleski doručak",
            price: 13.90
        },
        {
            name: "Američke palačinke",
            price: 8.45
        },
        {
            name: "Čokoladni kolač",
            price: 2.15
        },
        {
            name: "Cheesecake",
            price: 2.95
        },
    ],
    chosenMeals = [];

orderFood.addEventListener('click', openOrderForm);
orderForm.addEventListener('submit', processOrderSubmission);
buildingCheckbox.addEventListener('input', toggleBuildingNumberVisibility);
closeMenuButton.addEventListener('click', closeOrderMenu);

allMeals.forEach(meal => {
    meal.addEventListener('click', handleMealClick)
});

function handleMealClick() {
    let mealId = this.getAttribute('data-meal');

    if (chosenMeals.indexOf(mealId) === -1) {
        addToChosenMeals(mealId);
    } else {
        removeFromChosenMeals(mealId);
    }
}

function addToChosenMeals(mealId) {
    let meal = document.querySelector(`.meal[data-meal="${mealId}"]`);

    chosenMeals.push(mealId);
    meal.classList.add('chosen');

    updateLastPage();
}

function removeFromChosenMeals(mealId) {
    let meal = document.querySelector(`.meal[data-meal="${mealId}"]`);

    chosenMeals.splice(chosenMeals.indexOf('' + mealId), 1);
    meal.classList.remove('chosen');

    updateLastPage();
}

function updateLastPage() {
    let chosenMealsContainer = document.querySelector('ul#order-items'),
        totalPrice = 0,
        totalPriceElement = document.querySelector('.total-price .price');

    chosenMealsContainer.innerHTML = '';
    totalPriceElement.innerHTML = '';
    console.log(chosenMeals);

    chosenMeals.forEach(mealId => {
        totalPrice += parseFloat(mealsData[mealId-1].price);

        chosenMealsContainer.innerHTML += `
            <li>
                ${mealsData[mealId-1].name} ( $ ${mealsData[mealId-1].price.toFixed(2)} )
                <button class="remove" onclick="removeFromChosenMeals(${mealId})">Izbaci</button>
            </li>
        `;
    });

    console.log("When all is done" + totalPrice);

    totalPriceElement.innerHTML += totalPrice.toFixed(2);
}

function openOrderForm() {
    let orderForm = document.querySelector('.order-modal'),
        menu = document.querySelector('.menu');

    if (chosenMeals.length) {
        orderForm.classList.add('active');
        menu.classList.add('finished');
    } else {
        alert('You need to select some food...')
    }
}

function closeOrderMenu() {
    let orderModal = document.querySelector('.order-modal'),
        menu = document.querySelector('.menu');

    orderModal.classList.remove('active');
    menu.classList.remove('finished')
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

    alert("Porudžbina poslata! Bićete prebačeni na početnu stranicu za nekoliko sekundi.");

    setTimeout(() => {
        window.location.href = "../index.html";
    }, 2000);
}

function validateForm() {

    let formElements = document.querySelectorAll('#order-form input:not([type="checkbox"])');

    console.log(formElements);

    return false;
}


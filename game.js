// game.js
document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const petLevelInput = document.getElementById('petLevel');
    const mainAttributeInput = document.getElementById('mainAttribute');
    const drinkChoiceSelect = document.getElementById('drinkChoice');
    const resultText = document.getElementById('resultText');
    const drinkImage = document.getElementById('drinkImage');

    // Event listener for changing the drink choice
    drinkChoiceSelect.addEventListener('change', () => {
        const drinkChoice = drinkChoiceSelect.value.toLowerCase();

        console.log(`Selected drink: ${drinkChoice}`);

        // If there's no selection (blank choice), set the default image
        if (drinkChoice === '') {
            updateDrinkImage('default');
        } else {
            updateDrinkImage(drinkChoice);
        }
    });

    // Event listener for calculating result
    calculateBtn.addEventListener('click', () => {
        const petLevel = parseInt(petLevelInput.value, 10);
        const mainAttribute = parseInt(mainAttributeInput.value, 10);
        const drinkChoice = drinkChoiceSelect.value.toLowerCase();

        // Validate inputs
        if (isNaN(petLevel) || isNaN(mainAttribute) || petLevel < 1 || mainAttribute < 1) {
            alert("Please enter valid values for pet level and main attribute!");
            return;
        }

        // Call the calculation function
        const result = calculateResult(drinkChoice, mainAttribute, petLevel);
        resultText.textContent = `The result for ${capitalize(drinkChoice)} is: ${result}`;
    });

    // Event listener for reset button
    resetBtn.addEventListener('click', () => {
        petLevelInput.value = '';
        mainAttributeInput.value = '';
        drinkChoiceSelect.value = ''; // Reset to blank option
        resultText.textContent = 'The result will be shown here.';
        updateDrinkImage('default'); // Show the default image when resetting
    });

    // Update the image based on drink choice
    function updateDrinkImage(drink) {
        const imagePath = window.electron.images[drink] || window.electron.images.default;
        drinkImage.src = imagePath;

        console.log(`Updated drink image source: ${drinkImage.src}`);
    }

    // Calculation logic
    function calculateResult(drink, mainAttribute, petLevel) {
        const formulas = {
            milk: (x, y) => Math.floor((x / 10) + (y / 10) + 4),
            juice: (x, y) => Math.floor((x / 8) + (y / 8) + 6),
            coffee: (x, y) => Math.floor((x / 6) + (y / 6) + 8),
            soda: (x, y) => Math.floor((x / 5) + (y / 5) + 10),
            cola: (x, y) => Math.floor((x / 4) + (y / 4) + 12),
            champagne: (x, y) => Math.floor((x / 3) + (y / 3) + 14),
            water: (x, y) => Math.floor((x / 2) + (y / 2) + 16),
            'chicken essence': (x, y) => Math.floor((x / 1.5) + (y / 1.5) + 22),
            'ginseng soup': (x, y) => Math.floor((x * 0.75) + (y * 0.75) + 32),
        };

        return formulas[drink] ? formulas[drink](mainAttribute, petLevel) : "Invalid drink choice";
    }

    // Helper function to capitalize the drink name
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Initialize the page with the default image
    updateDrinkImage('default');
});

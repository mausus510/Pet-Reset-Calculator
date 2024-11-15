document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const petLevelInput = document.getElementById('petLevel');
    const mainAttributeInput = document.getElementById('mainAttribute');
    const drinkChoiceSelect = document.getElementById('drinkChoice');
    const resultText = document.getElementById('resultText');
    const drinkImage = document.getElementById('drinkImage');
  
    // Update the image based on drink choice
    function updateDrinkImage(drink) {
      const imagePath = window.electron.images[drink] || window.electron.images.default;
      drinkImage.src = imagePath;
  
      console.log(`Updated drink image source: ${drinkImage.src}`);
    }
  
    // Event listener for changing the drink choice
    drinkChoiceSelect.addEventListener('change', () => {
      const drinkChoice = drinkChoiceSelect.value.toLowerCase();
      console.log(`Selected drink: ${drinkChoice}`);
      updateDrinkImage(drinkChoice || 'default');
    });
  
    // Other event listeners and logic remain the same
    calculateBtn.addEventListener('click', () => {
      const petLevel = parseInt(petLevelInput.value, 10);
      const mainAttribute = parseInt(mainAttributeInput.value, 10);
      const drinkChoice = drinkChoiceSelect.value.toLowerCase();
  
      if (isNaN(petLevel) || isNaN(mainAttribute) || petLevel < 1 || mainAttribute < 1) {
        alert("Please enter valid values for pet level and main attribute!");
        return;
      }
  
      const result = calculateResult(drinkChoice, mainAttribute, petLevel);
      resultText.textContent = `The result for ${capitalize(drinkChoice)} is: ${result}`;
    });
  
    resetBtn.addEventListener('click', () => {
      petLevelInput.value = '';
      mainAttributeInput.value = '';
      drinkChoiceSelect.value = '';
      resultText.textContent = 'The result will be shown here.';
      updateDrinkImage('default');
    });
  
    // Initialize the page with the default image
    updateDrinkImage('default');
  });
  
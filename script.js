// Get DOM elements for progress bar and steps
const progressBar = document.getElementById('progressBar');
// Array of step indicator elements
const stepElements = [
    document.getElementById('step1'),
    document.getElementById('step2'),
    document.getElementById('step3'),
    document.getElementById('step4')
];
// Array of step content sections
const stepContents = [
    document.getElementById('stepContent1'),
    document.getElementById('stepContent2'),
    document.getElementById('stepContent3'),
    document.getElementById('stepContent4')
];

// Get button elements for various actions
const fundAccountBtn = document.getElementById('fundAccountBtn');
const swapForCreditsBtn = document.getElementById('swapForCreditsBtn');
const financialAdvisorAgent = document.getElementById('financialAdvisorAgent');
const budgetingAgent = document.getElementById('budgetingAgent');
const taxAgent = document.getElementById('taxAgent');
const billPayAgent = document.getElementById('billPayAgent');
const getAdviceBtn = document.getElementById('getAdviceBtn');
const backToHomeBtn = document.getElementById('backToHomeBtn');

// Get form and display elements
const fundingAmount = document.getElementById('fundingAmount');
const swapSlider = document.getElementById('swapSlider');
const sliderValue = document.getElementById('sliderValue');
const availableBalance = document.getElementById('availableBalance');
const availableCredits = document.getElementById('availableCredits');
const remainingUsdBalance = document.getElementById('remainingUsdBalance');
const remainingCredits = document.getElementById('remainingCredits');
const processingFee = document.getElementById('processingFee');
const successMessage = document.getElementById('successMessage');

// Initialize variables to track the current step, funds, and credits
let currentStep = 1;
let funds = 100;
let credits = 0;

/**
 * Updates the progress bar width based on the current step.
 */
function updateProgressBar() {
    const progressWidth = ((currentStep - 1) / (stepElements.length - 1)) * 100;
    progressBar.style.width = `${progressWidth}%`;
}

/**
 * Navigates to a specific step in the process.
 * Hides all step contents, updates step indicators, and displays the current step content.
 * @param {number} step - The step number to navigate to.
 */
function goToStep(step) {
    // Hide all step contents
    stepContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Update step indicators: mark completed, active, and pending steps
    stepElements.forEach((element, index) => {
        if (index + 1 < step) {
            element.classList.remove('active');
            element.classList.add('completed');
        } else if (index + 1 === step) {
            element.classList.add('active');
            element.classList.remove('completed');
        } else {
            element.classList.remove('active');
            element.classList.remove('completed');
        }
    });
    
    // Show the content for the current step
    stepContents[step - 1].classList.add('active');
    
    // Update the current step and progress bar
    currentStep = step;
    updateProgressBar();
}

/**
 * Initializes all event listeners for buttons, sliders, and agents.
 */
function initEventListeners() {
    // Event listener for Step 1: Fund Account
    fundAccountBtn.addEventListener('click', () => {
        // Set funds based on user input and update display
        funds = parseFloat(fundingAmount.value);
        availableBalance.textContent = `$${funds.toFixed(2)}`;
        // Move to next step
        goToStep(2);
    });
    
    // Event listener for slider input in Step 2: Swap for Credits
    swapSlider.addEventListener('input', () => {
        const creditsAmount = parseInt(swapSlider.value);
        // Update slider value display
        sliderValue.textContent = `${creditsAmount} Credits ($${creditsAmount.toFixed(2)})`;
        // Calculate and display processing fee (1% per credit)
        const fee = creditsAmount * 0.01;
        processingFee.textContent = `$${fee.toFixed(2)}`;
    });
    
    // Event listener for purchasing credits
    swapForCreditsBtn.addEventListener('click', () => {
        const creditsAmount = parseInt(swapSlider.value);
        const fee = creditsAmount * 0.01;
        
        // Update available credits and remaining funds after fee deduction
        credits = creditsAmount;
        funds -= (creditsAmount + fee);
        
        // Update UI elements with new balances
        availableCredits.textContent = credits;
        remainingUsdBalance.textContent = `$${funds.toFixed(2)}`;
        
        // Move to the next step
        goToStep(3);
    });
    
    // Event listeners for selecting an agent in Step 3
    financialAdvisorAgent.addEventListener('click', () => {
        remainingCredits.textContent = credits - 10;
        goToStep(4);
    });
    
    budgetingAgent.addEventListener('click', () => {
        remainingCredits.textContent = credits - 5;
        // For prototype purposes, all agents lead to step 4
        goToStep(4);
    });
    
    taxAgent.addEventListener('click', () => {
        remainingCredits.textContent = credits - 15;
        goToStep(4);
    });
    
    billPayAgent.addEventListener('click', () => {
        remainingCredits.textContent = credits - 2;
        goToStep(4);
    });
    
    // Event listener for getting financial advice in Step 4
    getAdviceBtn.addEventListener('click', () => {
        // Hide the form groups and button, then show success message
        getAdviceBtn.style.display = 'none';
        document.querySelectorAll('#stepContent4 .form-group').forEach(group => {
            group.style.display = 'none';
        });
        successMessage.classList.remove('hidden');
    });
    
    // Event listener for returning back to home/resetting the process
    backToHomeBtn.addEventListener('click', () => {
        // Reset funds, credits, and form values to initial state
        credits = 0;
        funds = 100;
        fundingAmount.value = "100";
        swapSlider.value = 50;
        sliderValue.textContent = "50 Credits ($50.00)";
        getAdviceBtn.style.display = 'block';
        // Reset visibility of form groups
        document.querySelectorAll('#stepContent4 .form-group').forEach(group => {
            group.style.display = 'block';
        });
        successMessage.classList.add('hidden');
        // Return to Step 1
        goToStep(1);
    });
}

// Initialize event listeners and update progress bar on page load
initEventListeners();
updateProgressBar();

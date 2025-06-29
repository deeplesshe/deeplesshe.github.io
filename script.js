document.addEventListener('DOMContentLoaded', () => {

    // Get all screen and button elements from the HTML
    const screens = document.querySelectorAll('.step');
    const startYesBtn = document.getElementById('start-yes');
    const startNoBtn = document.getElementById('start-no');
    const moodChoiceBtns = document.querySelectorAll('.mood-choice');
    const decisionYesBtn = document.getElementById('decision-yes');
    const decisionNoBtn = document.getElementById('decision-no');
    const availabilityYesBtn = document.getElementById('availability-yes');
    const availabilityNoBtn = document.getElementById('availability-no');
    const affordYesBtn = document.getElementById('afford-yes');
    const affordNoBtn = document.getElementById('afford-no');
    const riskYesBtn = document.getElementById('risk-yes');
    const riskNoBtn = document.getElementById('risk-no');
    const restartBtns = document.querySelectorAll('.restart');
    const freeTrialContinueBtn = document.getElementById('free-trial-continue');

    /**
     * Hides all screens and shows the one with the specified ID.
     * This function manages the navigation between steps.
     * @param {string} screenId The ID of the screen to display.
     */
    const showScreen = (screenId) => {
        // Adds visual feedback for user action
        const appContainer = document.getElementById('app-container');
        appContainer.style.transform = 'scale(0.99)';
        appContainer.style.opacity = '0.8';

        setTimeout(() => {
            screens.forEach(screen => {
                if (screen.id === screenId) {
                    screen.classList.remove('hidden');
                } else {
                    screen.classList.add('hidden');
                }
            });
            // Restore container appearance
            appContainer.style.transform = 'scale(1)';
            appContainer.style.opacity = '1';
        }, 150); // A short delay makes the transition feel smoother
    };

    // --- Event Listeners to handle the flowchart logic ---

    // 1. Start Screen: "Do you have a favorite genre?"
    startYesBtn.addEventListener('click', () => {
        document.getElementById('decision-question').textContent = "Have you decided upon which movie?";
        showScreen('decision-screen');
    });

    startNoBtn.addEventListener('click', () => {
        showScreen('mood-screen');
    });

    // 2. Mood Screen: "What do you feel like watching?"
    moodChoiceBtns.forEach(button => {
        button.addEventListener('click', () => {
            const genre = button.dataset.genre;
            let movieType = '';
            switch(genre) {
                case 'horror': movieType = 'a horror movie'; break;
                case 'romance': movieType = 'a romance movie'; break;
                case 'documentary': movieType = 'a documentary'; break;
                case 'action': movieType = 'an action movie'; break;
            }
            // Update the next screen's question with the recommendation
            document.getElementById('decision-question').innerHTML = `We recommend <strong>${movieType}</strong>. <br>Have you decided which one you'll watch?`;
            showScreen('decision-screen');
        });
    });

    // 3. Decision Screen: "Have you decided upon which movie?"
    decisionYesBtn.addEventListener('click', () => {
        showScreen('availability-screen');
    });

    decisionNoBtn.addEventListener('click', () => {
        showScreen('result-research');
    });

    // 4. Availability Screen: "Is it available on your streaming service?"
    availabilityYesBtn.addEventListener('click', () => {
        showScreen('result-enjoy');
    });

    availabilityNoBtn.addEventListener('click', () => {
        showScreen('affordability-screen');
    });

    // 5. Affordability Screen: "Can you afford to pay for movies?"
    affordYesBtn.addEventListener('click', () => {
        showScreen('result-find-new-service');
    });

    affordNoBtn.addEventListener('click', () => {
        showScreen('risk-screen');
    });

    // 6. Risk Screen: "Are you willing to take risks?"
    riskYesBtn.addEventListener('click', () => {
        showScreen('result-pirate');
    });

    riskNoBtn.addEventListener('click', () => {
        showScreen('result-free-trials');
    });

    // 7. Free Trial Continue Button
    // This implements the logic that finding free trials (N) leads to the same outcome as being able to pay (H).
    freeTrialContinueBtn.addEventListener('click', () => {
        showScreen('result-find-new-service');
    });

    // 8. Restart Buttons on all result screens
    restartBtns.forEach(button => {
        button.addEventListener('click', () => {
            showScreen('start-screen');
        });
    });

    // Initial state: Show the first screen when the page loads
    showScreen('start-screen');
});
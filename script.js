document.addEventListener('DOMContentLoaded', () => {
    
    lucide.createIcons();

    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlEl.classList.toggle('dark', savedTheme === 'dark');
    }

    themeToggleBtn.addEventListener('click', () => {
        htmlEl.classList.toggle('dark');
        localStorage.setItem('theme', htmlEl.classList.contains('dark') ? 'dark' : 'light');
    });

    const heroCta = document.getElementById('hero-cta');
    const getStartedSection = document.getElementById('get-started');

    if (heroCta && getStartedSection) {
        heroCta.addEventListener('click', (e) => {
            e.preventDefault();
            getStartedSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    const form = document.getElementById('contact-form');
    if (!form) return;

    const progressBar = document.getElementById('progress-bar');
    const formSteps = Array.from(form.querySelectorAll('fieldset[data-step]'));
    const totalSteps = formSteps.length;
    const thankYouMessage = document.getElementById('thank-you-message');

    const updateProgress = () => {
        let completedSteps = 0;
        formSteps.forEach(step => {
            const inputs = step.querySelectorAll('input');
            const isStepComplete = Array.from(inputs).some(input => input.checked);
            if (isStepComplete) {
                completedSteps++;
            }
        });
        const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
        if(progressBar) progressBar.style.width = `${progressPercentage}%`;
    };

    const validateFieldset = (fieldset) => {
        if (!fieldset) return;
        const inputs = fieldset.querySelectorAll('input');
        const isComplete = Array.from(inputs).some(input => input.checked);

        if (isComplete) {
            fieldset.classList.add('valid');
            fieldset.classList.remove('invalid');
        } else {
            fieldset.classList.add('invalid');
            fieldset.classList.remove('valid');
        }
    };

    form.addEventListener('change', (event) => {
        if (event.target.closest('fieldset')) {
            const fieldset = event.target.closest('fieldset');
            validateFieldset(fieldset);
            updateProgress();
        }
    });

    const allLabels = form.querySelectorAll('.form-radio-label, .form-check-label');
    allLabels.forEach(label => {
        const input = label.querySelector('input');
        if (input.type === 'radio') {
            input.addEventListener('change', () => {
                const radioGroup = document.getElementsByName(input.name);
                radioGroup.forEach(radio => {
                    radio.parentElement.classList.toggle('selected', radio.checked);
                });
            });
        }
        if (input.type === 'checkbox') {
            input.addEventListener('change', () => {
                label.classList.toggle('selected', input.checked);
            });
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let allValid = true;
        formSteps.forEach(step => {
            const inputs = step.querySelectorAll('input');
            const isComplete = Array.from(inputs).some(input => input.checked);
            if (!isComplete) {

                const firstInput = inputs[0];
                if (firstInput && firstInput.hasAttribute('required')) {
                    allValid = false;
                    step.classList.add('invalid');
                    step.classList.remove('valid');
                } else {

                    step.classList.remove('invalid', 'valid');
                }
            }
        });
        
        if (allValid) {
            form.style.display = 'none';
            if (thankYouMessage) {
                thankYouMessage.style.display = 'block';
                lucide.createIcons(); // Re-run for new icon in thank you message
            }
        } else {
            const firstInvalid = form.querySelector('.invalid');
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    updateProgress();
});

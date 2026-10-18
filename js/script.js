// Assignment 4 - Task 1: Form validation and Task 2: FAQ accordion

document.addEventListener("DOMContentLoaded", function () {
    // TASK 1: FORM VALIDATION
    const form = document.getElementById("signup-form");

    if (form) {
        const nameInput = document.getElementById("signup-name");
        const emailInput = document.getElementById("signup-email");
        const passwordInput = document.getElementById("signup-password");
        const confirmInput = document.getElementById("confirm-password");
        const message = document.getElementById("form-message");

        function showError(input, errorId, text) {
            document.getElementById(errorId).textContent = text;
            input.classList.toggle("input-error", Boolean(text));
            input.setAttribute("aria-invalid", text ? "true" : "false");
        }

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            let isValid = true;
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmInput.value;

            showError(nameInput, "name-error", "");
            showError(emailInput, "email-error", "");
            showError(passwordInput, "password-error", "");
            showError(confirmInput, "confirm-error", "");
            message.textContent = "";
            message.className = "form-message";

            if (name.length < 2) {
                showError(nameInput, "name-error", "Please enter your name (at least 2 characters).");
                isValid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showError(emailInput, "email-error", "Please enter a valid email address.");
                isValid = false;
            }

            if (password.length < 8) {
                showError(passwordInput, "password-error", "Password must contain at least 8 characters.");
                isValid = false;
            }

            if (confirmPassword === "" || confirmPassword !== password) {
                showError(confirmInput, "confirm-error", "Passwords are required and must match.");
                isValid = false;
            }

            if (isValid) {
                message.textContent = "Thank you! The form has been validated successfully.";
                message.classList.add("success-message");
                form.reset();
            } else {
                message.textContent = "Please correct the errors above and try again.";
                message.classList.add("error-message");
            }
        });

        [nameInput, emailInput, passwordInput, confirmInput].forEach(function (input) {
            input.addEventListener("input", function () {
                input.classList.remove("input-error");
                input.setAttribute("aria-invalid", "false");
                const error = document.getElementById(input.id === "signup-name" ? "name-error" :
                    input.id === "signup-email" ? "email-error" :
                    input.id === "signup-password" ? "password-error" : "confirm-error");
                error.textContent = "";
                message.textContent = "";
            });
        });
    }

    // TASK 2: ACCESSIBLE FAQ ACCORDION WITH A SMOOTH TRANSITION
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(function (question) {
        question.addEventListener("click", function () {
            const answerId = question.getAttribute("aria-controls");
            const answer = document.getElementById(answerId);
            const isOpen = question.getAttribute("aria-expanded") === "true";

            question.setAttribute("aria-expanded", String(!isOpen));
            answer.setAttribute("aria-hidden", String(isOpen));
            answer.style.maxHeight = isOpen ? "0px" : answer.scrollHeight + "px";

            const symbol = question.querySelector("span");
            if (symbol) {
                symbol.textContent = isOpen ? "+" : "−";
            }
        });
    });
});

function closeModal() {
    let modal = document.querySelector("#modal");
    modal.style.display = "none";
}

document.querySelector('#submit-button').addEventListener("click",
    function(event) {
        let wrong = false;
        let name_input = document.querySelector("#name");
        let surname_input = document.querySelector("#surname");
        let name_error = document.querySelector("#name-error");
        let surname_error = document.querySelector("#surname-error");
        let modal = document.querySelector("#modal");
        let modal_text = document.querySelector("#modal-text");
        let modal_button = document.querySelector("#modal-button")

        if (name_input.value.length === 0 || name_input.value.length > 40) {
            wrong = true;
            name_input.style.backgroundColor = "pink";
            name_input.style.borderColor = "red";
            name_error.innerHTML = "Wpisz poprawne imię."
        }

        if (surname_input.value.length === 0 || surname_input.value.length > 40) {
            wrong = true;
            surname_input.style.backgroundColor = "pink";
            surname_input.style.borderColor = "red";
            surname_error.innerHTML = "Wpisz poprawne nazwisko."
        }

        if (wrong)
            event.preventDefault();
        else {
            event.preventDefault(); // Zapobiegnięcie przeładowaniu strony.
            modal.style.display = "block";
            modal_text.innerHTML = name_input.value + " " + surname_input.value + ", formularz został wysłany.";

            const timeout = setTimeout(closeModal, 15000);
            modal_button.addEventListener("click", function (event) {
                clearTimeout(timeout);
                closeModal();
            })
        }
    }
)

document.querySelector("#form").addEventListener("focusin",
    function (event) {
        event.target.style.borderColor = "greenyellow";
    })

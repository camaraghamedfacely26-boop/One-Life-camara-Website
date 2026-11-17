const FORM_ENDPOINT = "";

const form = document.getElementById("contact-form");
const thanks = document.getElementById("form-thanks");
const modal = document.getElementById("custom-alert");
const modalIcon = modal.querySelector("i");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const inboxBtn = document.getElementById("inbox-btn");

function showAlert(title, text, ok) {
    modalIcon.className = ok ? "fa-solid fa-circle-check" : "fa-solid fa-circle-xmark";
    modalIcon.style.color = ok ? "#2ecc71" : "#e74c3c";
    modalTitle.textContent = title;
    modalText.textContent = text;
    inboxBtn.style.display = ok ? "inline-block" : "none";
    modal.style.display = "flex";
}

function closeAlert() {
    modal.style.display = "none";
}

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (FORM_ENDPOINT === "") {
        showAlert("Formulaire pas encore activé", "Écrivez-moi sur WhatsApp : +212 697 139 434.", false);
        return;
    }

    const data = new FormData(form);

    try {
        const response = await fetch(FORM_ENDPOINT, {
            method: "POST",
            body: data,
            headers: { Accept: "application/json" }
        });

        if (response.ok) {
            form.reset();
            form.style.display = "none";
            thanks.hidden = false;
            showAlert("Message envoyé !", "Merci, je vous réponds dès que possible.", true);
        } else {
            showAlert("Message non envoyé", "Écrivez-moi sur WhatsApp : +212 697 139 434.", false);
        }
    } catch (error) {
        showAlert("Message non envoyé", "Vérifiez votre connexion ou écrivez-moi sur WhatsApp.", false);
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form");

    // Pegar elementos do alerta
    const alertDialog = document.getElementById("alert-dialog-id");
    const alertMessage = document.getElementById("alert-message");
    const closeAlertButton = document.getElementById("close-alert-btn");

    // Função para mostrar o alerta
    function showAlert(message) {
        alertMessage.textContent = message; // Definir a mensagem
        alertDialog.classList.remove("hidden"); // Mostrar o alerta
        closeAlertButton.onclick = () => hideAlert(); // Ao clicar o botão esconde o alerta
    }

    // Função para esconder o alerta
    function hideAlert() {
        alertDialog.classList.add("hidden"); // Esconde o alerta
    }
    
    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // previne atualização do endereço da página para endereço/?

        // pegando os valores dos campos do formulário
        const name = document.getElementById("contact-form__name").value.trim();
        const email = document.getElementById("contact-form__email").value.trim();
        const msg = document.getElementById("contact-form__msg").value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name === "" || email === "" || msg === "") {
            showAlert("Por favor, preencha todos os campos antes de enviar a mensagem.");
            return;
        } else if (!emailRegex.test(email)) { // garante que os emails tem formato a@a.a
            showAlert("O endereço de e-mail parece estar incorreto. Verifique e tente novamente.");
            return;
        }

        // objeto com os dados necessários
        const data = {
            name,
            email,
            msg,
        };

        try {
            // POST request para App Scripts do Google. Dessa forma consigo
            // receber o email mesmo sem backend
            const res = await fetch("https://script.google.com/macros/s/AKfycbxLps-FzTm-0Z6wcn7ccwpL-sM9P7ki4PhqeZLSB-mk0KTYYZ1a6bc4GLiHkEcN6gQI_A/exec", {
            method: "POST",
            redirect: "follow",
            headers: {
                "Content-Type": "text/plain;charset=utf-8", // necessário para evitar CORS
            },
            body: new URLSearchParams(data).toString(),
            });

            const result = await res.json();

            if (result.status === "success") {
                showAlert("Mensagem enviada com sucesso!");
                form.reset();
            } else {
                showAlert("Erro ao enviar. Tente novamente.");
            }
        } catch (error) {
            console.error(error);
            // se error.message não for nulo será mostrado ao usuário
            showAlert(`Erro ao enviar. ${error.message || "Tente novamente mais tarde."}`);
        }
    });
});


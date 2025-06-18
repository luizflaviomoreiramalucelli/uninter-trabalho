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
            // POST request para App Scripts do Google através de uma API minha
            // na AWS. Com o App Scripts somente eu não consigo limitar o acesso
            // de endereços web, mas no meu backend eu consigo.
            const res = await fetch("http://3.137.221.99:3000/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const json = await res.json();
            if (result.status === "success") {
                showAlert("Mensagem enviada com sucesso!");
                form.reset();
            } else {
                showAlert("Erro ao enviar. Tente novamente.");
            }
        } catch (err) {
            console.error(err);
            // se error.message não for nulo será mostrado ao usuário
            showAlert(`Erro ao enviar. ${error.message || "Tente novamente mais tarde."}`);
        }

    });
});


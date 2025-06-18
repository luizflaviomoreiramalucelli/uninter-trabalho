document.addEventListener("DOMContentLoaded", () => {
    const oldUser = localStorage.getItem("empatia-visited") || false;
    const now = new Date(); // criando um objeto com a data de agora
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
    const lastVisited = Date.parse(localStorage.getItem("empatia-visited-time") || lastMonth.toString());

    // Diferença de tempo em milisegundos
    const difMs = now.getTime() - lastVisited;

    // Convertendo para horas
    const difHrs = difMs / (1000 * 60 * 60);


    // Se a pessoa visitou o site nas ultimas 24
    // horas nenhum alerta será mostrado
    if (difHrs < 24) {
        localStorage.setItem("empatia-visited-time", now.toString());
        return;
    }

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

    if (oldUser) {
        showAlert("Bem-vindo de volta!");
        localStorage.setItem("empatia-visited-time", now.toString());
    } else {
        localStorage.setItem("empatia-visited", true);
    }
});
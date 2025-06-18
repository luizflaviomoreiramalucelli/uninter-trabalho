document.addEventListener("DOMContentLoaded", () => {
    const empatiaImages = document.querySelectorAll(".empatia__image");
    const psicohubImages = document.querySelectorAll(".psicohub__image");
    const modulaImages = document.querySelectorAll(".modula__image");
    const fullViewContainer = document.querySelector(".full-view__container");
    const fullViewImageContainer = document.querySelector(".full-view__image-container");
    const fullViewImage = document.querySelector(".full-view__image");
    const fullViewCloseBtn = document.querySelector(".full-view__close-btn");
    const prevBtn = document.querySelector(".full-view__prev-btn");
    const nextBtn = document.querySelector(".full-view__next-btn");
    let currentIndex = 0;
    let currentArray = "";
    let images;

    // loop para que usa todas as imagens do projeto empatia
    // para definir currentIndex, currentArray, os botões de nav
    // e fazer funcionar um carrossel full screen
    empatiaImages.forEach((image, index) => {
        image.addEventListener("click", () => {
            currentIndex = index;
            currentArray = "empatia";
            fullViewImage.src = empatiaImages[currentIndex].src;
            updateNavButtonsAndImages();
            fullViewContainer.classList.remove("hidden");
        })
    });

    // loop para que usa todas as imagens do projeto maia
    // para definir currentIndex, currentArray, os botões de nav
    // e fazer funcionar um carrossel full screen
    psicohubImages.forEach((image, index) => {
        image.addEventListener("click", () => {
            currentIndex = index;
            currentArray = "psicohub";
            fullViewImage.src = psicohubImages[currentIndex].src;
            updateNavButtonsAndImages();
            fullViewContainer.classList.remove("hidden");
        })
    });

    // loop para que usa todas as imagens do projeto modula
    // para definir currentIndex, currentArray, os botões de nav
    // e fazer funcionar um carrossel full screen
    modulaImages.forEach((image, index) => {
        image.addEventListener("click", () => {
            currentIndex = index;
            currentArray = "modula";
            fullViewImage.src = modulaImages[currentIndex].src;
            updateNavButtonsAndImages();
            fullViewContainer.classList.remove("hidden");
        })
    });

    // adicionando funcionalidade de fechar o carrossel fullscreen
    fullViewCloseBtn.addEventListener("click", () => {
        fullViewContainer.classList.add("hidden");
        prevBtn.classList.add("hidden");
        nextBtn.classList.add("hidden");
        fullViewImage.src = "";
    });

    
    // função para decidir se é preciso esconder algum botão
    // de navegação do carrossel e atualizar a variável array
    // images que popula o carrossel
    function updateNavButtonsAndImages() {
        switch (currentArray) {
             case "empatia":
                images = empatiaImages;
                break;
            case "psicohub":
                images = psicohubImages;
                break;
            case "modula":
                images = modulaImages;
        }
        prevBtn.classList.toggle("hidden", currentIndex === 0);
        nextBtn.classList.toggle("hidden", currentIndex === images.length - 1);
    }

    prevBtn.addEventListener("click", () => {
        currentIndex -= 1;
        updateNavButtonsAndImages();
        fullViewImage.src = images[currentIndex].src;

    });

    nextBtn.addEventListener("click", () => {
        currentIndex += 1;
        updateNavButtonsAndImages();
        fullViewImage.src = images[currentIndex].src;
    });

    fullViewContainer.addEventListener('click', (e) => {
        // Verifica se o click foi no elemento pai e não em nenhum child element
        if (e.target === e.currentTarget) {
            // Esconde o carrossel porque clicaram fora da imagem
            fullViewContainer.classList.add("hidden");
        }
    });


});
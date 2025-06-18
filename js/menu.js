document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".menu-mobile__btn");
    const menuMobile = document.querySelector(".menu-mobile");
    const closeBtn = document.querySelector(".menu-mobile__close-btn")

    menuBtn.addEventListener("click", () => {
        menuMobile.classList.remove("hidden");
        console.log("hello");
    });

    closeBtn.addEventListener("click", () => {
        menuMobile.classList.add("hidden");
    });

    menuMobile.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
            menuMobile.classList.add("hidden");
        }
    });
});
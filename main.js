const nav = document.querySelector(".nav");
const btnMenu = document.querySelector(".btn-menu");
const menu = document.querySelector(".menu"); 

function handleButtonClick(event) {
    if(event.type === "touchstart") event.preventDefault();
    event.stopPropagation();
    nav.classList.toggle("active")
    handleClickOutside(menu, () => {
        nav.classList.remove("active");
        setAria();
    });
    setAria();
}

function handleClickOutside(targetElement, callback) {
    const html = document.documentElement;
    function handleHTMLClick(event) {
        if(!targetElement.contains(event.target)) {
            targetElement.removeAttribute("data-target");
            html.removeEventListener("click", handleHTMLClick);
            html.removeEventListener("touchstart", handleHTMLClick);
            callback();
        }
    }
    if(!targetElement.hasAttribute("data-target")) {
        html.addEventListener("click", handleHTMLClick);
        html.addEventListener("touchstart", handleHTMLClick);
        targetElement.setAttribute("data-target", "");
    }
}

function setAria() {
    const isActive = nav.classList.contains("active");
    btnMenu.setAttribute("aria-expanded", isActive);
    if(isActive){
        btnMenu.setAttribute("aria-label", "Fechar Menu");
    } else {
        btnMenu.setAttribute("aria-label", "Abrir Menu");
    }
}

btnMenu.addEventListener("click", handleButtonClick);
btnMenu.addEventListener("touchstart", handleButtonClick);

// Fecha o menu ao clicar em qualquer link de navegação mobile
const menuLinks = document.querySelectorAll('.menu a');

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove("active"); // Fecha o menu
    setAria(); // Atualiza o aria-expanded e aria-label
  });
});


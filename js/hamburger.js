const open = document.querySelector("#burger");
const openElement = document.querySelector("#active");
const body = document.querySelector("#scrol")

open.addEventListener("click", e => {
openElement.style.display = "block";
body.style.overflow = "hidden";
})

const closeElement = document.querySelector("#close");

closeElement.addEventListener("click", e => {
    e.preventDefault();
    openElement.style.display = "none";
    body.style.overflow = "";
})


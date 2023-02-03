const open = document.querySelector("#burger");
const openElement = document.querySelector("#active");

open.addEventListener("click", e => {
openElement.style.display = "block";
})

const closeElement = document.querySelector("#close");

closeElement.addEventListener("click", e => {
    e.preventDefault();
    openElement.style.display = "none";
})


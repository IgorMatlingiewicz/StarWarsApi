BaseUrl = "https://swapi.dev/api";

function renderError() {
    let container = document.querySelector(".container");
    console.log(container);
    container.innerHTML += `
        <h2 class="fw-bold text-center mt-4">Error!</h2>
        <p class="text-center">There was en error while trying to load content. Reload the page or try again later.</p>
    `
}

let loader = document.querySelector(".loader");
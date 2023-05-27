let BASE_URL = "https://swapi.dev/api/people"

const renderCharacter = (el) => {
    let characterNumber = el.url.replace(/\D/g, "");
    let homeworldLink = el.homeworld.replace(/\D/g, "");
    let html = `
    <li class="list-group-item m-3 border-0">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${characterNumber}">
        ${characterNumber}. ${el.name} 
    </button>
    <div class="modal fade" id="${characterNumber}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel"> ${el.name} </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <ul class="list-group">
                        <li class="list-group-item">Height: ${el.height}</li>
                        <li class="list-group-item">Mass: ${el.mass}</li>
                        <li class="list-group-item">Hair color: ${el.hair_color}  </li>
                        <li class="list-group-item">Skin color: ${el.ckin_color}</li>
                        <li class="list-group-item">Eye color: ${el.eye_color}</li>
                        <li class="list-group-item">Birth year: ${el.birth_year}</li>
                        <li class="list-group-item">Gender: ${el.gender}</li>
                        <li class="list-group-item">
                            <a href="${el.homeworld}" target="_blank">Planet number ${homeworldLink}</a>
                        </li>

                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</li>
    `
    return html
}
const renderCharacters = (data) => {
    let characters = document.querySelector(".list-group");
    characters.innerHTML = "";
    data.results.map(character => {
        characters.innerHTML += renderCharacter(character)
    })
}

async function getDataFromServer(url) {
    let phase1 = await fetch(url)
    let data = await phase1.json();
    renderCharacters(data)
}

let pageNumber = 1;

function changePage() {
    let buttonNext = document.querySelector(".btn-success");
    buttonNext.addEventListener("click", function () {
        pageNumber += 1;
        newUrl =  BASE_URL + `/?page=${pageNumber}`
        getDataFromServer(newUrl)
    }); 

    let buttonPrevious = document.querySelector(".btn-danger");
    buttonPrevious.addEventListener("click", function () {
        if (pageNumber != 1) {
            pageNumber -= 1;
            newUrl =  BASE_URL + `/?page=${pageNumber}`
            getDataFromServer(newUrl)
        }
    }); 
}

changePage();
getDataFromServer(BASE_URL);
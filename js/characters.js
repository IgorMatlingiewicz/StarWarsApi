CharactersUrl = BaseUrl + "/people/";

const renderCharacterGrid = (el) => {
    let characterNumber = el.url.replace(/\D/g, "");
    let homeworldLink = el.homeworld.replace(/\D/g, "");
    let html = `
    <div class="col-sm">
        <li class="list-group-item border-0 m-3 bg-transparent">
        <button type="button" class="btn btn-primary text-center" data-bs-toggle="modal" data-bs-target="#${characterNumber}">
        ${characterNumber}. ${el.name} 
        </button>
        <div class="modal fade" id="${characterNumber}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 fw-bold text-primary" id="exampleModalLabel"> ${el.name} </h1>
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
    </div>
    `
    return html
}
const renderCharacterTable = (el) => {
    let characterNumber = el.url.replace(/\D/g, "");
    let homeworldLink = el.homeworld.replace(/\D/g, "");
    let html = `
    <tr class="text-center border-bottom border-primary">
        <th scope="row">${characterNumber}</th>
        <td><h2 class="fw-bold">${el.name}</h2></td>
        <td>${el.height}</td>
        <td>${el.mass}</td>
        <td>${el.hair_color}</td>
        <td>${el.skin_color}</td>
        <td>${el.eye_color}</td>
        <td>${el.birth_year}</td>
        <td>${el.gender}</td>
        <td>${homeworldLink}</td>
    </tr>
    `
    return html
}

let charactersGrid = document.querySelector(".row");
let charactersTable = document.querySelector("tbody");

const renderCharacters = (data) => {
    charactersGrid.innerHTML = "";
    charactersTable.innerHTML = "";
    data.results.map(character => {
        charactersGrid.innerHTML += renderCharacterGrid(character);
        charactersTable.innerHTML += renderCharacterTable(character);
    })
}

async function getDataFromServer(url) {
    loader.style.display = "block";
    charactersGrid.innerHTML = "";
    charactersTable.innerHTML = "";
    let phase1 = await fetch(url)
    let data = await phase1.json();

    if (phase1.ok) {
        loader.style.display = "none";
        renderCharacters(data)
    } else {
        renderError();
    }
}

let pageNumber = 1;

function changePage() {
    let buttonNext = document.querySelector("#nextPage");
    buttonNext.addEventListener("click", function () {
        if (pageNumber != 9) {
            pageNumber += 1;
            newUrl = CharactersUrl + `/?page=${pageNumber}`
            getDataFromServer(newUrl)
        }
    });

    let buttonPrevious = document.querySelector("#prevPage");
    buttonPrevious.addEventListener("click", function () {
        if (pageNumber != 1) {
            pageNumber -= 1;
            newUrl = CharactersUrl + `/?page=${pageNumber}`
            getDataFromServer(newUrl)
        }
    });
}

changePage();
getDataFromServer(CharactersUrl);
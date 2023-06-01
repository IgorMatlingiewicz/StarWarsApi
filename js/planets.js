PlanetsUrl = BaseUrl + "/planets";

function getCSSclass(terrain){
    let result;
    terrains.filter(e=>{
       if(e.inputData.some(e=> e == terrain) == true){
         result = e.CSSclass
        
        }
    })
    return result;
}

const renderPlanetGrid = (el) => {
    let planetNumber = el.url.replace(/\D/g, "");
    let html = `
    <div class="col-sm">
        <li class="list-group-item m-3 border-0 bg-transparent">
        <button type="button" class="btn  btn-primary text-center" data-bs-toggle="modal" data-bs-target="#${planetNumber}">
        ${planetNumber}. ${el.name} 
        </button>
        <div class="modal fade" id="${planetNumber}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 font-weight-bold text-primary" id="exampleModalLabel"> ${el.name} </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <ul class="list-group">
                        <li class="list-group-item">Rotation period: ${el.rotation_period}</li>
                        <li class="list-group-item">Orbital period: ${el.orbital_period}</li>
                        <li class="list-group-item">Diameter: ${el.diameter}  </li>
                        <li class="list-group-item">Climate: ${el.climate}</li>
                        <li class="list-group-item">Gravity: ${el.gravity}</li>
                        <li class="list-group-item">Terrain: ${el.terrain}</li>
                        <li class="list-group-item">Surface water: ${el.surface_water}</li>
                        <li class="list-group-item">Population: ${el.population}</li>
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

const renderPlanetTable = (el) => {
    renderIcons(el.terrain);
    let planetNumber = el.url.replace(/\D/g, "");
    let html = `
    <tr class="text-center border-bottom border-primary">
        <th scope="row">${planetNumber}</th>
        <td><h2 class="font-weight-bold">${el.name}</h2></td>
        <td>${el.rotation_period}</td>
        <td>${el.orbital_period}</td>
        <td>${el.diameter}</td>
        <td>${el.climate}</td>
        <td>${el.gravity}</td>
        <td class="terrain">
            ${renderIcons(el.terrain)}
        </td>
        <td>${el.surface_water}</td>
        <td>${el.population}</td>
    </tr>
    `
    return html
}

const renderIcons = (terrains) => {
    let terrainsList = terrains.split(",");
    let html = "";
    terrainsList.map(el => {
        html += `<div class="icon ${getCSSclass(el.trim())}"></div>`
    })
    return html
}

const renderPlanets = (data) => {
    let planetsGrid = document.querySelector(".row");
    let planetsTable = document.querySelector("tbody");
    planetsGrid.innerHTML = "";
    planetsTable.innerHTML = "";
    data.results.map(planet => {
        planetsGrid.innerHTML += renderPlanetGrid(planet)
        planetsTable.innerHTML += renderPlanetTable(planet)
    })
}

async function getDataFromServer(url) {
    let phase1 = await fetch(url)
    let data = await phase1.json();
    renderPlanets(data)
}

let pageNumber = 1;

function changePage() {
    let buttonNext = document.querySelector("#nextPage");
    buttonNext.addEventListener("click", function () {
        if (pageNumber != 6) {
            pageNumber += 1;
            newUrl =  PlanetsUrl + `/?page=${pageNumber}`
            getDataFromServer(newUrl)
        }
    }); 

    let buttonPrevious = document.querySelector("#prevPage");
    buttonPrevious.addEventListener("click", function () {
        if (pageNumber != 1) {
            pageNumber -= 1;
            newUrl =  PlanetsUrl + `/?page=${pageNumber}`
            getDataFromServer(newUrl)
        }
    }); 
}

changePage();
getDataFromServer(PlanetsUrl);
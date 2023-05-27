const renderPlanet = (el) => {
    let planetNumber = el.url.replace(/\D/g, "");
    let html = `
    <li class="list-group-item m-3 border-0">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${planetNumber}">
        ${el.name} 
    </button>
    <div class="modal fade" id="${planetNumber}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel"> ${el.name} </h1>
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
    `
    return html
}
const renderPlanets = (data) => {
    let planets = document.querySelector(".list-group");
    planets.innerHTML = "";
    data.results.map(planet => {
        planets.innerHTML += renderPlanet(planet)
    })
}

async function getDataFromServer(url) {
    let phase1 = await fetch(url)
    let data = await phase1.json();
    renderPlanets(data)
}

getDataFromServer("https://swapi.dev/api/planets");
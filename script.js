// Write your JavaScript code here!


window.addEventListener("load", function () {
    const document = window.document;
    const pilot = document.querySelector("input[name=pilotName]");
    const copilot = document.querySelector("input[name=copilotName]");
    const fuelLevel = document.querySelector("input[name=fuelLevel]");
    const cargoMass = document.querySelector("input[name=cargoMass]");
    

    let form = document.getElementById("launchForm");
    let list = document.getElementById("faultyItems")

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        formSubmission(document, list, pilot.value, copilot.value, fuelLevel.value, cargoMass.value)
    });

    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {

        listedPlanets = result;
        console.log(listedPlanets);

    }).then(function () {
        planet = pickPlanet(listedPlanets)
        addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image)
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
    })






});




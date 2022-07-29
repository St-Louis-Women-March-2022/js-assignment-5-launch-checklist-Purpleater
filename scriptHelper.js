// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let target = document.getElementById("missionTarget")
    target.innerHTML = `<h2>Mission Destination</h2>
            <ol>
                <li>Name: ${name}</li>
                <li>Diameter: ${diameter}</li>
                <li>Star: ${star}</li>
                <li>Distance from Earth: ${distance}</li>
                <li>Number of Moons: ${moons}</li>
            </ol>
            <img src="${imageUrl}">`
}

function validateInput(testInput) {

    if (testInput === '') {
        return 'Empty';
    }
    else if (isNaN(testInput) === false) {
        return "Is a number";
    }
    else {
        return 'Is not a number';
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    const title = document.getElementById("launchStatus")


    const pilotStatus = document.getElementById("pilotStatus");
    const copilotStatus = document.getElementById("copilotStatus");
    const fuelStatus = document.getElementById("fuelStatus");
    const cargoStatus = document.getElementById("cargoStatus");

    let cargoReady = true;
    let fuelReady = true;

    if (validateInput(pilot) === 'Empty' || validateInput(copilot) === 'Empty' || validateInput(fuelLevel) === 'Empty' || validateInput(cargoLevel) === 'Empty') {
        window.alert("Invalid input (empty entry)")
    } else if (validateInput(pilot) !== 'Is not a number' || validateInput(copilot) !== 'Is not a number') {
        window.alert("Invalid input (or lack of input) within the pilot and/or the copilot entry");
    } else if (validateInput(fuelLevel) !== 'Is a number' || validateInput(cargoLevel) !== 'Is a number') {
        window.alert("Invalid input (or lack of input) has been provided for the fuel/cargo amount");
    } else {
        list.style.visibility = 'visible'
        pilotStatus.innerHTML = `${pilot} is ready for launch`
        copilotStatus.innerHTML = `${copilot} is ready for launch`


        if (fuelLevel < 10000) {
            fuelStatus.innerHTML = `Fuel level too low for launch`;
            fuelReady = false;
        } else {
            fuelStatus.innerHTML = `Fuel level adequate for launch`;
        }

        if (cargoLevel > 10000) {
            cargoStatus.innerHTML = `Cargo mass is too large for the journey`;
            cargoReady = false;
        } else {
            cargoStatus.innerHTML = `Cargo mass adequate for the journey`;
        }

        if (fuelReady === true && cargoReady === true) {
            title.innerHTML = `Shuttle is ready for launch`;
            title.style.color = 'green';
        }
        else {
            title.innerHTML = `Shuttle is not ready for launch`;
            title.style.color = 'red';
        }

    }

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then(function (response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    planet = Math.floor(Math.random() * planets.length - 1)
    return planets[planet]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;

// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
            `<h2>Mission Destination</h2>
            <ol>
                <li>Name: ${json.name}</li>
                <li>Diameter: ${json.diameter}</li>
                <li>Star: ${json.star}</li>
                <li>Distance from Earth: ${json.distance}</li>
                <li>Number of Moons: ${json.moons}</li>
            </ol>
            <img src="${json.image}">`
}

function validateInput(testInput) {
    let validation = '';
    if (isNaN(testInput) === false){
        validation = 'Is a number';
    }
    else if (isNaN(testInput) === true){
        validation = 'Is not a number';
    }
    else{
        validation = 'Empty';
    }
    return validation;
 }

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let launchStatus = true;
    // these conditionals validate if the information provided is of the correct variable type
   if(validateInput(pilot && copilot) != 'Is not a number'){
    document.getElementByID("faultyItems").styles.visibility='visible';
    window.alert("Invalid input (or lack of input) within the pilot and/or the copilot entry");
    launchStatus = false;
   }
   else{
    launchStatus = true;
   }

   if(validateInput(fuelLevel) != 'Is a number'){
    document.getElementByID("faultyItems").styles.visibility='visible';
    window.alert("Invalid input (or lack of input) has been provided for the fuel amount.");
    launchStatus = false;
   }
   else{
    launchStatus = true;
   }
   if(validateInput(cargoLevel) != 'Is a number'){
    document.getElementByID("faultyItems").styles.visibility='visible';
    window.alert("Invalid input (or lack of input) has been provided for the cargo amount.");
    launchStatus = false;
   }
   else{
    launchStatus = true;
   }
   // these conditionals check to make sure that the the cargo and fuel mass are of the correct amount
   if(fuelLevel < 10000){
    document.getElementByID("faultyItems").styles.visibility='visible';
    document.getElementByID("fuelStatus") = `<li>Fuel level too low for launch</li>`;
    document.getElementByID("launchStatusCheck").styles.color = 'red';
    document.getElementByID("launchStatusCheck") = `<li>Shuttle not ready for launch</li>`
    launchStatus = false;
   }
   else{
    launchStatus = true;
   }
   if(cargoLevel > 10000){
    document.getElementByID("faultyItems").styles.visibility='visible';
    document.getElementByID("cargoStatus") = `<li>Cargo mass is too large for the journey</li>`;
    document.getElementByID("launchStatusCheck").styles.color = 'red';
    document.getElementByID("launchStatusCheck") = `<li>Shuttle not ready for launch</li>`;
    launchStatus = false;
   }
   else{
    launchStatus = true;
   }
   if(launchStatus == true){
    document.getElementByID("launchStatusCheck").styles.color = 'green';
    document.getElementByID("launchStatusCheck") = `<li>Shuttle is ready for launch</li>`;
    document.getElementByID("pilotStatus") = `<li>${pilotName} is ready for launch</li>`;
    document.getElementByID("copilotStatus") = `<li>${copilotName} is ready for launch</li>`;
   }

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
        response.json().then(function(json){
            const planet = document.getElementById("missionTarget");
            planet.innerHTML = addDestinationInfo(document, json.name, json.diamter, json.star, json.distance, json.moons, json.image)
            });
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    selectedDestination = Math.random(planets)
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;

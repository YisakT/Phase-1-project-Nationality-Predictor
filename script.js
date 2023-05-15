document.getElementById("submit-button").onclick = function(event) {
    event.preventDefault();
    
    const name = document.getElementById("input-name").value;
    fetch(`https://api.nationalize.io?name=${name}`)
    .then(response => response.json())
    .then(data => {
        if (data.country.length === 0) {
            const resultContainer = document.getElementById("result");
            while (resultContainer.firstChild) {
                resultContainer.removeChild(resultContainer.firstChild);
            }
            const noPredictionElement = document.createElement("p");
            noPredictionElement.textContent = `No predictions found. Please check your entry for typos.`;
            resultContainer.appendChild(noPredictionElement);
        } else {
            const predictions = data.country.map(prediction => {
                return fetch(`https://restcountries.com/v3.1/alpha/${prediction.country_id}`)
                .then(response => response.json())
                .then(countryData => {
                    const countryName = countryData.length > 0 && countryData[0].name ? countryData[0].name.common : 'unknown';
                    const capitalCity = countryData.length > 0 && countryData[0].capital ? countryData[0].capital[0] : 'unknown';
                    const flagUrl = countryData.length > 0 && countryData[0].flags ? countryData[0].flags.png : 'unknown';
                    return {countryId: prediction.country_id, probability: prediction.probability, flagUrl: flagUrl, countryName: countryName, capitalCity: capitalCity};
                });
            });
            Promise.all(predictions).then(predictions => {
                const resultContainer = document.getElementById("result");
                while (resultContainer.firstChild) {
                    resultContainer.removeChild(resultContainer.firstChild);
                }
                const resultHeader = document.createElement("p");
                resultHeader.textContent = `The predicted nationalities for the name ${name} are:`;
                resultContainer.appendChild(resultHeader);
                predictions.forEach(prediction => {
                    const predictionElement = document.createElement("p");
                    predictionElement.textContent = `${prediction.countryId}: ${prediction.probability}`;
                    const flagImage = document.createElement("img");
                    flagImage.src = prediction.flagUrl;
                    flagImage.alt = `${prediction.countryId} flag`;
                    predictionElement.appendChild(flagImage);
                    const funFactElement = document.createElement("p");
                    funFactElement.textContent = `Fun fact: The capital city of ${prediction.countryName} is ${prediction.capitalCity}.`;
                    predictionElement.appendChild(funFactElement);
                    resultContainer.appendChild(predictionElement);
                });
            });
        }
    });
};

document.getElementById("input-name").onkeydown = function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("submit-button").click();
    }
};

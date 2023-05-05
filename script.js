document.getElementById("submit-button").onclick = function(event) {
    event.preventDefault();
    const name = document.getElementById("input-name").value;
    fetch(`https://api.nationalize.io?name=${name}`)
    .then(response => response.json())
    .then(data => {
        const predictions = data.country.map(prediction => {
            return fetch(`https://restcountries.com/v3.1/alpha/${prediction.country_id}`)
            .then(response => response.json())
                    .then(countryData => {
                        const countryName = countryData[0].name.common;
                        const capitalCity = countryData[0].capital[0];
                        const flagUrl = countryData[0].flags.png;
                        return {countryId: prediction.country_id, probability: prediction.probability, flagUrl: flagUrl, countryName: countryName, capitalCity: capitalCity};
                    });
            });
            Promise.all(predictions).then(predictions => {
                const resultContainer = document.getElementById("result");
                while (resultContainer.firstChild) {
                    resultContainer.removeChild(resultContainer.firstChild);
                }

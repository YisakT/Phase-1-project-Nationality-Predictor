document.getElementById("submit-button").onclick = function(event) {
    event.preventDefault();
    const name = document.getElementById("input-name").value;
    fetch(`https://api.nationalize.io?name=${name}`)
    .then(response => response.json())
    .then(data => {
        const predictions = data.country.map(prediction => {
            return fetch(`https://restcountries.com/v3.1/alpha/${prediction.country_id}`)
}

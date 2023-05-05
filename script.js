document.getElementById("submit-button").onclick = function(event) {
    event.preventDefault();
    const name = document.getElementById("input-name").value;
    fetch(`https://api.nationalize.io?name=${name}`)
    .then(response => response.json())
}

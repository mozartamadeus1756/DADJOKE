document.addEventListener("click", function(event){
    if(!event.target.matches("#button")) return;

    console.log("button was pressed");

    const URL = 'https://icanhazdadjoke.com/'

    fetch(URL, {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('eeroor');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.joke);
        document.getElementById("punchline").textContent = data.joke;
    })
    .catch(error => {
        console.error('error fetching the dad joke', error);
    }); 
});


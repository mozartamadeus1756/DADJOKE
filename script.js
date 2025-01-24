let currentJoke = '';  

document.addEventListener("click", function(event) {
    if (!event.target.matches("#button")) return;
    console.log("button was pressed");

    const URL = 'https://icanhazdadjoke.com/';
    fetch(URL, {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error fetching joke');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.joke);
        currentJoke = data.joke;  // store the joke for later use
        document.getElementById("punchline").textContent = data.joke;
    })
    .catch(error => {
        console.error('Error fetching the dad joke', error);
    });
});

document.addEventListener("click", function(event) {
    if (!event.target.matches("#favorite")) return;

    console.log("favorite button pressed");

    if (currentJoke) {
        const favoriteJokeData = {
            joke: currentJoke,
            date: new Date().toISOString().split('T')[0]  
        };
        console.log(favoriteJokeData);

        fetch("http://localhost:5502/favorite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(favoriteJokeData)
        })
        .then(response => response.json())
        .then(data => console.log("server response", data))
        .catch(error => console.error("error", error));
}});

document.addEventListener("click", function(event) {
    if (!event.target.matches("#see-favorites")) return;

    window.location.href = "http://localhost:5503/see-favorites";

    fetch("http://localhost:5503/see-favorites", { 
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    // .then(data => {
    //     console.log("favorites", data);
    //     displayFavorites(data);
    // })
    .catch(error => console.log("error fetching favorites", error)); 
});










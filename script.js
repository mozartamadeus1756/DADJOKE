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
        console.log(favoriteJokeData) 
}});







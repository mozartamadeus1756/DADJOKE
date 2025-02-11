let currentJoke = '';  

document.addEventListener("click", function(event) {
    if (!event.target.matches("#button")) return;
    console.log("Button was pressed");

    const punchline = document.getElementById("punchline");
    punchline.textContent = "Loading...";  // Add loading state

    const URL = 'https://icanhazdadjoke.com/';
    fetch(URL, {
        headers: {
            'Accept': 'application/json',
            'User-Agent': 'Dad Joke Web App'
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
        currentJoke = data.joke; 
        punchline.textContent = data.joke;
    })
    .catch(error => {
        console.error('Error fetching the dad joke', error);
        punchline.textContent = "Oops! Failed to fetch joke. Please try again.";
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

        const favoriteButton = document.getElementById("favorite");
        favoriteButton.textContent = "Saving...";
        favoriteButton.disabled = true;

        fetch("http://localhost:5502/favorite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(favoriteJokeData)
        })
        .then(response => response.json())
        .then(data => {
            console.log("server response", data);
            favoriteButton.textContent = "❤️ Added!";
            setTimeout(() => {
                favoriteButton.textContent = "❤️ Add to Favorites";
                favoriteButton.disabled = false;
            }, 2000);
        })
        .catch(error => {
            console.error("error", error);
            favoriteButton.textContent = "Failed to save";
            setTimeout(() => {
                favoriteButton.textContent = "❤️ Add to Favorites";
                favoriteButton.disabled = false;
            }, 2000);
        });
    }
});

document.addEventListener("click", function(event) {
    if (!event.target.matches("#see-favorites")) return;
    window.location.href = 'favorites.html';
});
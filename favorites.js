document.addEventListener('DOMContentLoaded', function() {
    fetchFavorites();
});

function fetchFavorites() {
    fetch("http://localhost:5503/see-favorites")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayFavorites(data);
        })
        .catch(error => {
            console.error("Error fetching favorites:", error);
            document.getElementById("favorites-container").innerHTML = 
                `<p class="error-message">Error loading favorites: ${error.message}</p>`;
        });
}

function displayFavorites(jokes) {
    const container = document.getElementById("favorites-container");
    container.innerHTML = '';

    if (jokes.length === 0) {
        container.innerHTML = "<p>No favorite jokes yet!</p>";
        return;
    }
    
    jokes.forEach(joke => {
        let formattedDate = new Date(joke.date).toISOString().split('T')[0];  

        const jokeDiv = document.createElement('div');
        jokeDiv.className = 'joke-card';
        jokeDiv.innerHTML = `
            <p class="joke-text">${joke.joke}</p>
            <p class="joke-date">Saved on: ${formattedDate}</p>
        `;
        container.appendChild(jokeDiv);
    });
}

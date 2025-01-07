# DAD JOKE API

this is a eazy web application that fetches random dad jokes from **icanhazdadjoke** API and displayes them on the page, when the **GET** **DADAJOKE** is pressed. It is styled with a bright yellow background and a bright button you just have to click!

***

## Table of content

(finne ut av hvordan man lager linker??)

***

## Demo

1) Click the **GET** **DADAJOKE** to fetch a dad joke.
2) The joke will display right undet the button.

***

## Features 

* Fetches a random dad joke from the icanhazdadjoke API.
* Simple and responsive user interface:
    * The button and text are centered vertically and horizontally on the screen.
    * Styled button with hover effect.
    * Clean display of the dad joke below the button.
* Handles errors gracefully, displaying messages in the browser's console if anything goes wrong.

***

## How it works

1) **HTML Structure:**
    * A button ····(id="button") to trigger the joke fetch.
    * A paragraph ····(id="punchline") to display the joke.
2) **JavaScript Logic:**
    * Listens for clicks on the button.
    * Fetches a random dad joke from the icanhazdadjoke API using the fetch function.
    * Updates the paragraph with the fetched joke or logs errors if something goes wrong.
3) **CSS Styling:**
    * Centers the button and text on the screen using Flexbox.
    * Adds a clean, fun look with custom fonts, colors, and shadows.

***

## Technologies Used

* **HTML:** For the structure of the page.
* **CSS:** For the styling and the layout.
* **JavaScript:** For handeling button clicks, making API calls, and updating the UI.
* **icanhozdadjoke API:** To fetch dad jokes. 

***

## Setup Instructions

1) Clone or download the repository.
2) Open the index.html file in any web browser.
3) Click the "GET DADAJOKE" button to fetch and display a random dad joke.

***

## Code breakdown 

**HTML**
```
<body>

    <button id="button" type="button" >GET DADAJOKE</button>
    <p id="punchline"></p>

    
    <script src="script.js"></script>
</body>
</html>
```

* A button ····(id="button") to trigger the joke-fetching process.
* A ····<p> element ····(id="punchline") to display the fetched joke.

***

**CSS**
```
body {
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
    height: 100vh; 
    margin: 0; 
    background-color: yellow;
    font-family: 'Jersey 15', sans-serif;
}

#button {
    color: red;
    font-size: 30px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: white; 
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    font-family: 'Jersey 15', sans-serif; 
}

#button:hover {
    background-color: #f0f0f0; 
}

#punchline {
    color: black;
    font-size: 25px; 
    margin-top: 20px; 
    text-align: center;
}
```
* **Body:** Centers the button and joke text using Flexbox.
* **Button:** Styled with hover effects, rounded corners, and shadow for a clean look.
* **Punchline:** Styles the joke text for visibility and readability.

*** 
**JacaScript**
```
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

```
* Attaches a click event listener to the entire document.
* Detects when the button is clicked.
* Fetches a dad joke from the icanhazdadjoke API.
* Displays the joke in the ····<p> element or logs errors to the console.

***

## Future improvments 

1) **Store jokes:** Store or save jokes in a way, perhaps in a favorit system were you can favorit certain jokes, and store them.

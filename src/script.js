import { pokemonArray } from "../data/pokemon.js";

const container = document.querySelector(".board__container");
// const resetButton = document.querySelector("#reset");

// TODO: functions 
//      button/ click on card to start game
//      reset button to start game again, with newly shuffled array
//      mopves to be recorded and time recorded
//      shouldnt be able to first card back, manually

//shuffle the pokemon array 
const shuffleArray = () => {
    return pokemonArray.sort(() => Math.random() - 0.5);
}

//create game with 
const generateGame = () => {
    shuffleArray();

    // append div class="card" for each SHUFFLED pokemon array
    pokemonArray.forEach(pokemon => {
        container.innerHTML += `
        <div class="card" id="${pokemon.id}">
            <div class="card__face">
                <img src="${pokemon.sprite}" class="card__image">
            </div>
            <div class="card__back">
            </div>
        </div>`; 
    });        
    
    // for each card clicked, toggleCard class needs added to replicate animation from css
    const getPokemonCard = document.querySelectorAll(".card");
    getPokemonCard.forEach(card => {
        card.addEventListener("click", (event) => {
            card.classList.toggle("toggleCard");
            checkCard(event);
        });
    });
};

//Check cards that are clicked
const checkCard = (event) => {
    const clickedCard = event.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    
    //check 2 clicked cards for match using their id 
    if(flippedCards.length === 2) {
        //if there is matches, remove flipped class and you cannot click on card again
        if(flippedCards[0].getAttribute("id") === flippedCards[1].getAttribute("id")) {
            console.log("match");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            });
            //else remove flipped class AND toggleCard 
        } else {
            console.log("not a match");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"), 1000);
            });
        };
    };
};

generateGame()
// event listeners - listen out for changes to page and updates using code.
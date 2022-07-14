import { pokemonArray } from "../data/pokemon.js";

// query selectors - for all aspects that need updates
const container = document.querySelector(".board__container");
// global variables

// functions - DRY, does 1 thing, meaningful names
//      cards to flip when clicked
//      button/ click on card to start game
//      reset button to start game again, with newly shuffled array
//      mopves to be recorded and time recorded

//shuffle the pokemon array 
const shuffleArray = () => {
    return pokemonArray.sort(() => Math.random() - 0.5);
}

// append div class="card" for each SHUFFLED pokemon array
const addPokemon = () => {
    shuffleArray();

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
    
    const getPokemonCard = document.querySelectorAll(".card");
    getPokemonCard.forEach(card => {
        card.addEventListener("click", (event) =>{
            card.classList.toggle("toggleCard")
        });
    });
};

// event listeners - listen out for changes to page and updates using code.
container.addEventListener("load", addPokemon());
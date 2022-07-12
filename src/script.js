import { pokemonArray } from "../data/pokemon.js";

// query selectors - for all aspects that need updates
const container = document.querySelector(".board__container");
const pokemonCard = document.querySelectorAll(".card");
console.log(pokemonCard);
// global variables

// functions - DRY, does 1 thing, meaningful names
//      cards to flip when clicked
//      button/ click on card to start game
//      reset button to start game again, with newly shuffled array
//      mopves to be recorded and time recorded


const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
}

const addPokemon = () => {
    pokemonArray.forEach(pokemon => {
        container.innerHTML += `
        <div class="card">
            <img src="${pokemon.sprite}" class="card__image">
            <div class="card__content">
                <h2 class="card__heading"> ${pokemon.name} </h2>
            </div>
        </div>`; 
    });
};

// event listeners - listen out for changes to page and updates using code.
container.addEventListener("load", addPokemon());
import { pokemonArray } from "../data/pokemon.js";

// query selectors - for all aspects that need updates
// global variables
// functions - DRY, does 1 thing, meaningful names
// event listeners - listen out for changes to page and updates using code.

const container = document.querySelector(".board__container");

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

container.addEventListener("load", addPokemon());
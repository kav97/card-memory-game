import { pokemonArray } from "../data/pokemon.js";

const selectors = {
    container: document.querySelector('.board__container'),
    moves: document.querySelector('.record__flips'),
    timer: document.querySelector('.record__timer'),
    start: document.querySelector('#start'),
    reset: document.querySelector('#reset'),
}

const state = {
    hasGameStarted: false,
    totalFlips: 0,
    totalTime: 0,
    loop: null,
}

// TODO: functions 
//      shouldnt be able to first card back, manually
//      functions need to be split up - too many nested if statements

//shuffle the pokemon array 
const shuffleArray = () => {
    return pokemonArray.sort(() => Math.random() - 0.5);
}

//create game with 
const generateGame = () => {
    shuffleArray();

    // append div class="card" for each SHUFFLED pokemon array
    pokemonArray.forEach(pokemon => {
        selectors.container.innerHTML += `
        <div class="card" id="${pokemon.id}">
            <div class="card__face">
                <img src="${pokemon.sprite}" class="card__image">
            </div>
            <div class="card__back">
            </div>
        </div>`; 
    });        
    
    // for each card clicked, card__toggle class needs added to replicate flip animation from css
    const getPokemonCard = document.querySelectorAll(".card");
    getPokemonCard.forEach(card => {
        card.addEventListener("click", (event) => {
            card.classList.toggle("card__toggle");
            checkCard(event);
        });
    });
};

//Check cards that are clicked
const checkCard = (event) => {
    const clickedCard = event.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".card__toggle");
    
    state.totalFlips++;

    if (!state.hasGameStarted) {
        startGame();
    }

    //check 2 clicked cards for match using their id 
    if(flippedCards.length === 2) {
        //if there is matches, remove flipped class and you cannot click on card again
        if(flippedCards[0].getAttribute("id") === flippedCards[1].getAttribute("id")) {
            console.log("match");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            });
            //else remove flipped class AND card__toggle 
        } else {
            console.log("not a match");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("card__toggle"), 1000);
            });
        };
    }

    // If there are no more cards that we can flip, we won the game
    if (toggleCard.length === pokemonArray.length) {
        setTimeout(() => {
            alert(`You won in ${state.totalTime} seconds with ${state.totalFlips} moves! Way to go!`);

            clearInterval(state.loop);
        }, 1000)
    }
};

const startGame = () => {
    selectors.start.style.pointerEvents = "none";
    state.hasGameStarted = true;
    generateGame();
    
    state.loop = setInterval(() => {
        state.totalTime++

        selectors.moves.innerText = `#Flips: ${state.totalFlips}`
        selectors.timer.innerText = `Time: ${state.totalTime} secs`
    }, 1000)
}

const resetGame = () => {
    location.reload();
} 

selectors.reset.addEventListener("click", resetGame);
selectors.start.addEventListener("click", startGame);
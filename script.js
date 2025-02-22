const input = document.getElementById("pokemon-input");
const image = document.getElementById("pokemon-image");
const name = document.getElementById("pokemon-name");
const type = document.getElementById("pokemon-type");
const form = document.getElementById("pokemon-form");

//async function
async function fetchPokemonData(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error("Pokémon not found");
        }
        const pokemonData = await response.json();
        return pokemonData;
    } catch (error) {
        console.error("There was an error with the request:", error.message);
        return null;
    }
}

//event listeners and text updates
form.addEventListener("submit", async (event) => {
    event.preventDefault(); 

    const inputData = await fetchPokemonData(input.value);
    if (!inputData) {
        name.innerHTML = "Pokémon not found!";
        image.innerHTML = "";
        type.innerHTML = "";
        return;
    }

    image.innerHTML = `<img src="${inputData.sprites.front_default}" alt="${inputData.name}">`;
    name.innerHTML = `Name: ${inputData.name}`;
    type.innerHTML = `Type: ${inputData.types.map(t => t.type.name).join(", ")}`;
});



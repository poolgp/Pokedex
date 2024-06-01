// src/services/pokemonService.js

export async function fetchPokemon() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=152');
        const data = await response.json();
        const pokemonPromises = data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));
        const pokemonData = await Promise.all(pokemonPromises);
        return pokemonData;
    } catch (err) {
        console.error("Error fetching API: ", err);
        throw err;
    }
}
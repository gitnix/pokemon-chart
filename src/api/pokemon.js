import axios from "axios"

import { delay, wrapPromise } from "../util/request"

import { POKEMON_FETCH_LIMIT, POKEMON_URL } from "../util/constants"

async function fetchPokemon(offset = 0) {
  try {
    // just an extra delay to make the loading screen stick around longer
    // for purposes of the demo
    // for initial load use a longer delay
    await delay(offset > 0 ? 2000 : 4000)

    // get the inital list of pokemon
    const response = await axios.get(
      `${POKEMON_URL}?limit=${POKEMON_FETCH_LIMIT}&offset=${offset}`,
    )

    const pokemonNames = response.data.results.map((pokemon) => pokemon.name)

    // get the detailed info for each pokemon
    const pokemonPromises = pokemonNames.map((name) =>
      axios.get(`${POKEMON_URL}/${name}`),
    )

    const pokemonResponses = await Promise.all(pokemonPromises)

    const pokemonData = pokemonResponses.map((response) => response.data)

    return pokemonData
  } catch {
    return []
  }
}

export function fetchPokemonData(offset) {
  const pokemenPromise = fetchPokemon(offset)
  return {
    pokemon: wrapPromise(pokemenPromise),
  }
}

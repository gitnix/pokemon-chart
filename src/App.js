import { Suspense, useState } from "react"

import Box from "@mui/material/Box"

import "./App.css"

import { fetchPokemonData } from "./api/pokemon"
import { POKEMON_FETCH_LIMIT } from "./util/constants"

import Footer from "./components/Footer"
import Header from "./components/Header"
import Loading from "./components/Loading"
import Lyrics from "./components/Lyrics"
import Pokemon from "./components/Pokemon"

const initialResource = fetchPokemonData(0)

function App() {
  const [resource, setResource] = useState(initialResource)
  const [offset, setOffset] = useState(0)

  return (
    <Box className="app">
      <Suspense fallback={<Loading />}>
        <Box className="content">
          <Header
            currentOffset={offset}
            onNextClick={() => {
              const newOffset = offset + POKEMON_FETCH_LIMIT
              setResource(fetchPokemonData(newOffset))
              setOffset(newOffset)
            }}
            onPrevClick={() => {
              const newOffset = offset - POKEMON_FETCH_LIMIT
              setResource(fetchPokemonData(newOffset))
              setOffset(newOffset)
            }}
            subtitle={`Gotta catch 'em all`}
            title="Pokémon Chart"
          />
          <Pokemon resource={resource} />
        </Box>
        <Box className="footer">
          <Footer>{Lyrics}</Footer>
        </Box>
      </Suspense>
    </Box>
  )
}

export default App

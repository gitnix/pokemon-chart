import { useLayoutEffect, useState } from "react"
import FastAverageColor from "fast-average-color"

import styled from "@emotion/styled"

import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Chip from "@mui/material/Chip"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import pokeball from "../assets/images/pokeball.png"
import iconMap from "../util/icon"

const PokemonContainer = styled.div`
  background-color: gainsboro;
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  margin-bottom: 300px;
  padding: 30px;
  position: relative;
`

const PokemonCard = styled(Card)`
  cursor: default;
  position: relative;
`

const PokemonCardContent = styled(CardContent)`
  align-items: center;
  display: flex;
  justify-content: center;
`

const PokemonImage = styled.img`
  aspect-ratio: 1;
  opacity: ${(p) => (p.isHovered ? "0" : "1")};
  transform: ${(p) => (p.isHovered ? "scale(0)" : "scale(1)")};
  transition: opacity 0.8s, transform 0.8s;
  width: 100%;
`

const PokeballImage = styled.img`
  align-items: center;
  background-color: transparent;
  color: red;
  display: flex;
  height: 100%;
  justify-content: center;
  opacity: ${(p) => (p.isHovered ? "1" : "0")};
  position: absolute;
  top: 0;
  transform: ${(p) => (p.isHovered ? "scale(0)" : "scale(1)")};
  transition: opacity 0.8s, transform 0.8s;
  width: 100%;
`

const PokemonCardInfo = styled.div`
  align-items: center;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  opacity: ${(p) => (p.isHovered ? "1" : "0")};
  position: absolute;
  text-transform: capitalize;
  top: 0;
  transform: ${(p) => (p.isHovered ? "scale(1)" : "scale(0)")};
  transition: opacity 0.8s, transform 0.8s;
  width: 100%;
`

function Pokemon({ resource }) {
  const pokemon = resource.pokemon.read()

  const [hoveredImageId, setHoveredImageId] = useState(-1)

  // using layoutEffect as we need DOM updates to complete
  useLayoutEffect(() => {
    const averageColor = new FastAverageColor()

    // get all images and convert NodeList to array
    const pokemonImages = Array.from(
      document.querySelectorAll(".pokemon_image"),
    )

    // get the average color of each image and apply it to card background color
    pokemonImages.forEach((image, index) => {
      averageColor
        .getColorAsync(image)
        .then((color) => {
          const pokemonCard = document.querySelector(`#${pokemon[index].name}`)
          pokemonCard.style.backgroundColor = color.rgba
        })
        .catch((e) => {
          console.error(e)
        })
    })
  }, [pokemon])

  return (
    <PokemonContainer>
      {pokemon.map((p) => {
        const isHovered = p.id === hoveredImageId
        return (
          <PokemonCard
            id={p.name}
            key={p.id}
            onMouseEnter={() => setHoveredImageId(p.id)}
            onMouseLeave={() => setHoveredImageId(-1)}>
            <PokemonCardContent>
              <PokemonImage
                alt={p.name}
                className="pokemon_image"
                crossOrigin="anonymous"
                isHovered={isHovered}
                src={p.sprites.front_default}
              />
              <PokeballImage
                alt="pokeball"
                isHovered={isHovered}
                src={pokeball}
              />
              <PokemonCardInfo isHovered={isHovered}>
                <Stack alignItems="center" spacing={2}>
                  <Typography variant="h3">{p.name}</Typography>
                  {p.types.map((type) => {
                    const typeName = type.type.name
                    return (
                      <Chip
                        icon={
                          <img
                            alt="pokemon type"
                            src={iconMap[typeName] || iconMap.normal}
                            style={{
                              width: "20px",
                              height: "80%",
                            }}
                          />
                        }
                        key={typeName}
                        label={<Typography variant="h6">{typeName}</Typography>}
                      />
                    )
                  })}
                </Stack>
              </PokemonCardInfo>
            </PokemonCardContent>
          </PokemonCard>
        )
      })}
    </PokemonContainer>
  )
}

export default Pokemon

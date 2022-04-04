import Typography from "@mui/material/Typography"

const lyrics = `
I wanna be the very best
Like no one ever was
To catch them is my real test
To train them is my cause
I will travel across the land
Searching far and wide
Each Pokémon to understand
The power that's inside
`

const mappedLyrics = lyrics
  .split("\n")
  .filter((line) => !!line)
  .map((line) => {
    return (
      <Typography key={line} variant="h5">
        {line}
      </Typography>
    )
  })

export default mappedLyrics

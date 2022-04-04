import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import "../assets/css/pokeball.css"

const Loading = () => {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
      }}>
      <div className="pokeball">
        <div className="pokeball_button"></div>
      </div>
      <Typography sx={{ marginTop: "10px" }} className="pulsate" variant="h4">
        Loading...
      </Typography>
    </Box>
  )
}

export default Loading

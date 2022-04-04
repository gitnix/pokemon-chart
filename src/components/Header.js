import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

const Header = ({
  currentOffset,
  onNextClick,
  onPrevClick,
  subtitle,
  title,
}) => {
  return (
    <Stack alignItems="center">
      <Typography
        sx={(theme) => ({
          fontSize: "50px",
          [theme.breakpoints.down("md")]: {
            fontSize: "36px",
          },
        })}>
        {title}
      </Typography>
      <Typography style={{ marginBottom: "10px" }} variant="subtitle">
        {subtitle}
      </Typography>
      <ButtonGroup size="large">
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ marginBottom: "10px" }}
          width="100%">
          <Button
            sx={(theme) => ({
              width: "400px",
              [theme.breakpoints.down("md")]: {
                width: "100px",
              },
            })}
            disabled={currentOffset === 0}
            onClick={onPrevClick}>
            Previous
          </Button>
          <Button
            sx={(theme) => ({
              width: "400px",
              [theme.breakpoints.down("md")]: {
                width: "100px",
              },
            })}
            onClick={onNextClick}>
            Next
          </Button>
        </Stack>
      </ButtonGroup>
    </Stack>
  )
}

export default Header

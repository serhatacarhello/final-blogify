import { Typography, Box, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
    >
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h4">Aradığınız sayfa bulunamadı :(</Typography>
        <Typography sx={{ mt: 2 }}>
          Üzgünüz, aradığınız sayfaya şu an ulaşılamıyor.
        </Typography>

        <Button sx={{ mt: 2 }} component={Link} to="/">
          Ana Sayfaya Dön
        </Button>
        <Box maxWidth={"500px"} marginTop={-20}>
          <img
            width={"100%"}
            src="https://i.imgur.com/qIufhof.png"
            alt="Not found"
          />
        </Box>
      </Box>
    </Stack>
  );
}

export default NotFound;

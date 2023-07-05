import { TextField, Button, Box, Typography } from "@mui/material";

import styles from "./CreateTournamentPage.module.scss";

export const CreateTournamentPageComponent = () => {
  return (
    <Box className={styles.formContainer}>
      <Box className={styles.formImage}>
        <Typography
          fontSize={"4rem"}
          sx={{ fontWeight: "bold", color: "white" }}
          component={"h1"}
        >
          Hamilton.
        </Typography>
        <Typography
          fontSize={"1.5rem"}
          sx={{ fontWeight: "bold", color: "white" }}
        >
          Create tournaments for you wish.
        </Typography>
        <Typography fontSize={"1rem"} sx={{ color: "white" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id tenetur
          voluptates molestiae optio quas voluptate cum quisquam ea, libero
          corrupti reprehenderit repellat fugit rem expedita eveniet, dicta
          magni dolorum ratione!
        </Typography>
      </Box>

      <Box component='form' onSubmit={() => alert(123)} className={styles.form}>
        <Typography fontSize={"2rem"} sx={{ fontWeight: "bold" }}>
          Create tournament
        </Typography>
        <TextField size='small' label='Title'></TextField>
        <TextField size='small' label='Description'></TextField>
        <TextField size='small' label='Number of players'></TextField>
        <TextField size='small' id='entry-fee' label='Entry fee' />
        <TextField size='small' label='Prize distribution'></TextField>

        <Button
          type='submit'
          variant='contained'
          sx={{
            width: "fit-content",
            alignSelf: "center",
            backgroundColor: "hsl(337deg 100% 43%)",

            "&:hover": {
              backgroundColor: "hsl(329deg 100% 36%)",
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

CreateTournamentPageComponent.displayName = "CreateTournamentPage";

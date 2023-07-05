import { TextField, Button, Box } from "@mui/material";

import styles from "./CreateTournamentPage.module.scss";

export const CreateTournamentPageComponent = () => {
  return (
    <Box component='form' onSubmit={() => alert(123)} className={styles.form}>
      <TextField size='small' label='Title'></TextField>

      <TextField size='small' label='Description'></TextField>
      <TextField size='small' label='Number of players'></TextField>

      <TextField size='small' id='entry-fee' label='Entry fee' />

      <TextField size='small' label='Prize distribution'></TextField>

      <Button
        type='submit'
        variant='contained'
        sx={{ width: "fit-content", alignSelf: "center" }}
      >
        Submit
      </Button>
    </Box>
  );
};

CreateTournamentPageComponent.displayName = "CreateTournamentPage";

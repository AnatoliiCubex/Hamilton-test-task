import { ChangeEvent, useState } from "react";

import { TextField, Button, Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import styles from "./CreateTournamentPage.module.scss";

export const CreateTournamentPageComponent = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [prizeDistAmount, setPrizeDistAmount] = useState(1);

  const handleChangeNumberOfPlayers = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (isNaN(newValue)) return;
    setNumberOfPlayers(newValue);
  };

  const handleDecreasePrizeDist = () => {
    if (prizeDistAmount - 1 === 0) return;
    setPrizeDistAmount(prizeDistAmount - 1);
  };

  const handleChangePrizeDistAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (isNaN(newValue)) return;
    setPrizeDistAmount(newValue);
  };

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
        <TextField size='small' label='Title' />
        <TextField size='small' label='Description' />
        <TextField
          size='small'
          label='Number of players'
          placeholder='from 2 to 100'
          value={numberOfPlayers > 0 ? numberOfPlayers : ""}
          onChange={handleChangeNumberOfPlayers}
        />
        <TextField
          size='small'
          label='Entry fee'
          placeholder='from 0 to 1000'
        />

        <Box className={styles.prizeDistCounterContainer}>
          <Typography fontSize={"1.1rem"} sx={{ fontWeight: "bold" }}>
            Prize distributions
          </Typography>

          <Box className={styles.prizeDistCounter}>
            <IconButton
              color='primary'
              sx={{ padding: "4px" }}
              onClick={handleDecreasePrizeDist}
            >
              <RemoveIcon />
            </IconButton>
            <TextField
              sx={{
                fontWeight: "bold",
                width: "fit-content",
                maxWidth: "50px",
              }}
              variant='standard'
              value={prizeDistAmount}
              onChange={handleChangePrizeDistAmount}
            />
            <IconButton
              color='primary'
              sx={{ padding: "4px" }}
              onClick={() => setPrizeDistAmount(prizeDistAmount + 1)}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Box>

        <Box component={"ul"} className={styles.prizeDistList}>
          {Array(prizeDistAmount)
            .fill(0)
            .map((_, index) => (
              <Box className={styles.prizeDistItem} key={index} component='li'>
                #{index + 1}
                <TextField size='small' label='Place' />
                <TextField size='small' label='Prize' />
              </Box>
            ))}
        </Box>
        <Typography fontSize={"1.1rem"} sx={{ fontWeight: "bold" }}>
          Total prize pool:
        </Typography>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          sx={{
            width: "fit-content",
            alignSelf: "center",
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

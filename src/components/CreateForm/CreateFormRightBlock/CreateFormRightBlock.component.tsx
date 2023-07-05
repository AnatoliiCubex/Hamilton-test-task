import { useState } from "react";
import { inputNumberOnChange } from "@utils/inputNumberOnChange";

import { Box, Typography, TextField, Button } from "@mui/material";

import styles from "./CreateFormRightBlock.module.scss";
import { PrizeDistributionCounter } from "../PrizeDistributionCounter";

export const CreateFormRightBlockComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [entryFee, setEntryFee] = useState(-1);
  const [prizeDistAmount, setPrizeDistAmount] = useState(1);

  return (
    <Box component='form' onSubmit={() => alert(123)} className={styles.form}>
      <Typography fontSize={"2rem"} sx={{ fontWeight: "bold" }}>
        Create tournament
      </Typography>
      <TextField
        size='small'
        label='Title'
        variant='standard'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        size='small'
        label='Description'
        variant='standard'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        size='small'
        label='Number of players'
        placeholder='from 2 to 100'
        value={numberOfPlayers > 0 ? numberOfPlayers : ""}
        onChange={(e) => inputNumberOnChange(e, setNumberOfPlayers)}
        variant='standard'
      />
      <TextField
        size='small'
        label='Entry fee'
        placeholder='from 0 to 1000'
        variant='standard'
        value={entryFee > -1 ? entryFee : ""}
        onChange={(e) => inputNumberOnChange(e, setEntryFee)}
      />

      <PrizeDistributionCounter
        prizeDistAmount={prizeDistAmount}
        setPrizeDistAmount={setPrizeDistAmount}
      />

      <Box component={"ul"} className={styles.prizeDistList}>
        {Array(prizeDistAmount)
          .fill(0)
          .map((_, index) => (
            <Box className={styles.prizeDistItem} key={index} component='li'>
              #{index + 1}
              <TextField size='small' label='Place' variant='standard' />
              <TextField size='small' label='Prize' variant='standard' />
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
            backgroundColor: "var(--primary-hover)",
          },
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

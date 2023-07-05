import { useEffect, useRef, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import autoAnimate from "@formkit/auto-animate";

import { inputNumberOnChange } from "@utils/inputNumberOnChange";

import { PrizeDistributionCounter } from "../PrizeDistributionCounter";

import styles from "./CreateFormRightBlock.module.scss";

export const CreateFormRightBlockComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [entryFee, setEntryFee] = useState(-1);
  const [prizeDistAmount, setPrizeDistAmount] = useState(1);
  const prizeDistListParent = useRef(null);
  const totalPrizeParent = useRef(null);

  useEffect(() => {
    prizeDistListParent.current && autoAnimate(prizeDistListParent.current);
    totalPrizeParent.current && autoAnimate(totalPrizeParent.current);
  }, [prizeDistListParent, totalPrizeParent]);

  return (
    <Box component='form' onSubmit={() => alert(123)} className={styles.form}>
      <Typography fontSize={"2rem"} sx={{ fontWeight: "bold" }}>
        Create tournament
      </Typography>
      <TextField
        size='small'
        label='Title'
        placeholder='from 5 to 50 characters'
        variant='standard'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        size='small'
        label='Description'
        placeholder='from 10 to 100 characters'
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
        label='Entry fee (cents)'
        placeholder='from 0 to 1000'
        variant='standard'
        value={entryFee > -1 ? entryFee : ""}
        onChange={(e) => inputNumberOnChange(e, setEntryFee)}
      />

      <PrizeDistributionCounter
        prizeDistAmount={prizeDistAmount}
        setPrizeDistAmount={setPrizeDistAmount}
      />

      <Box
        component={"ul"}
        className={styles.prizeDistList}
        ref={prizeDistListParent}
      >
        {Array(prizeDistAmount)
          .fill(0)
          .map((_, index) => (
            <Box className={styles.prizeDistItem} key={index} component='li'>
              #{index + 1}
              <TextField size='small' label='Place' variant='filled' />
              <TextField size='small' label='Prize' variant='filled' />
            </Box>
          ))}
      </Box>

      <div ref={totalPrizeParent}>
        {entryFee > -1 && numberOfPlayers > 0 && (
          <Typography
            fontSize={"1.1rem"}
            sx={{
              fontWeight: "bold",
            }}
          >
            Total prize pool: {(numberOfPlayers * entryFee) / 100}$
          </Typography>
        )}
      </div>

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

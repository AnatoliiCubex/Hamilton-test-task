import React, { Dispatch, SetStateAction } from "react";
import { inputNumberOnChange } from "@utils/inputNumberOnChange";

import { Box, Typography, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import styles from "./PrizeDistributionCounter.module.scss";

type Props = {
  prizeDistAmount: number;
  setPrizeDistAmount: Dispatch<SetStateAction<number>>;
};

export const PrizeDistributionCounterComponent: React.FC<Props> = ({
  prizeDistAmount,
  setPrizeDistAmount,
}) => {
  const handleDecreasePrizeDist = () => {
    if (prizeDistAmount - 1 === 0) return;
    setPrizeDistAmount(prizeDistAmount - 1);
  };

  return (
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
          onChange={(e) => inputNumberOnChange(e, setPrizeDistAmount)}
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
  );
};

PrizeDistributionCounterComponent.displayName = "PrizeDistributionCounter";

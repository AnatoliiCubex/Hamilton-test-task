import React, { Dispatch, SetStateAction, useState } from "react";

import {
  Box,
  Typography,
  IconButton,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import styles from "./PrizeDistributionCounter.module.scss";

type PrizeDistributions = {
  place: number;
  prize: string;
}[];

type Props = {
  numberOfPlayers: number;
  prizeDistAmount: number;
  setPrizeDistAmount: Dispatch<SetStateAction<PrizeDistributions>>;
};

export const PrizeDistributionCounterComponent: React.FC<Props> = ({
  numberOfPlayers,
  prizeDistAmount,
  setPrizeDistAmount,
}) => {
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);

  const handleDecreasePrizeDist = () => {
    if (prizeDistAmount - 1 === 0) {
      setIsOpenSnackbar(true);
      return;
    }
    setPrizeDistAmount((prev) => {
      prev.pop();
      return [...prev];
    });
  };

  const handleChangeNumberOfPrizeDist = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const desiredLength = Number(e.target.value);
    if (desiredLength > numberOfPlayers) {
      setIsOpenSnackbar(true);
      return;
    }
    setPrizeDistAmount((prev) => {
      const currentLength = prev.length;
      const numItemsToAdd = desiredLength - currentLength;
      const newItems = Array.from({ length: numItemsToAdd }, () => ({
        place: 0,
        prize: "0",
      }));
      return [...prev, ...newItems];
    });
  };

  const handleIncreaseNumberOfPrizeDistByButtonClick = () => {
    if (prizeDistAmount + 1 > numberOfPlayers) {
      setIsOpenSnackbar(true);
      return;
    }
    setPrizeDistAmount((prev) => {
      return [...prev, { place: 0, prize: "0" }];
    });
  };

  return (
    <>
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
            inputProps={{ style: { textAlign: "center" } }}
            variant='standard'
            value={prizeDistAmount}
            onChange={handleChangeNumberOfPrizeDist}
          />
          <IconButton
            color='primary'
            sx={{ padding: "4px" }}
            onClick={handleIncreaseNumberOfPrizeDistByButtonClick}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
      <Snackbar
        open={isOpenSnackbar}
        autoHideDuration={6000}
        onClose={() => setIsOpenSnackbar(false)}
      >
        <Alert
          severity='error'
          variant='filled'
          onClose={() => setIsOpenSnackbar(false)}
        >
          Number of prize pools cant be 0 or more than number of players
        </Alert>
      </Snackbar>
    </>
  );
};

PrizeDistributionCounterComponent.displayName = "PrizeDistributionCounter";

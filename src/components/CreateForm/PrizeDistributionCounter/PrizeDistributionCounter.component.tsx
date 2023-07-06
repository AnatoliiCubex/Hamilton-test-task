import React, { Dispatch, SetStateAction } from "react";

import { Box, Typography, IconButton, TextField } from "@mui/material";
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
  setIsOpenSnackbar: Dispatch<SetStateAction<boolean>>;
  setSnackBarMessage: Dispatch<SetStateAction<string>>;
};

export const PrizeDistributionCounterComponent: React.FC<Props> = ({
  numberOfPlayers,
  prizeDistAmount,
  setPrizeDistAmount,
  setIsOpenSnackbar,
  setSnackBarMessage,
}) => {
  const handleDecreasePrizeDist = () => {
    if (prizeDistAmount - 1 === 0) {
      setSnackBarMessage("Prize distributions cant be 0");
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
      setSnackBarMessage(
        "Amount of prize distributions cant be more than number of players"
      );
      setIsOpenSnackbar(true);
      return;
    }
    setPrizeDistAmount((prev) => {
      const currentLength = prev.length;
      let numItemsToAdd;
      let newItems;
      if (desiredLength > currentLength) {
        numItemsToAdd = desiredLength - currentLength;
        newItems = Array.from({ length: numItemsToAdd }, () => ({
          place: 0,
          prize: "0",
        }));
        return [...prev, ...newItems];
      } else {
        numItemsToAdd = desiredLength;
        newItems = Array.from({ length: numItemsToAdd }, () => ({
          place: 0,
          prize: "0",
        }));
        return [...newItems];
      }
    });
  };

  const handleIncreaseNumberOfPrizeDistByButtonClick = () => {
    if (prizeDistAmount + 1 > numberOfPlayers) {
      setSnackBarMessage(
        "Prize distributions cant be more than number of players"
      );
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
    </>
  );
};

PrizeDistributionCounterComponent.displayName = "PrizeDistributionCounter";

import { Box, TextField } from "@mui/material";

import styles from "./PrizeDistributionFields.module.scss";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";

type Props = {
  prizeDistributions: {
    place: number;
    prize: number;
  }[];
  setPrizeDistributions: Dispatch<
    SetStateAction<
      {
        place: number;
        prize: number;
      }[]
    >
  >;
  availableMoney: () => number;
  setSnackBarMessage: Dispatch<SetStateAction<string>>;
  setIsOpenSnackbar: Dispatch<SetStateAction<boolean>>;
  prizePool: number;
};

export const PrizeDistributionFieldsComponent: React.FC<Props> = ({
  prizeDistributions,
  setPrizeDistributions,
  availableMoney,
  setSnackBarMessage,
  setIsOpenSnackbar,
  prizePool,
}) => {
  const prizeDistListParent = useRef(null);
  const prizeDistListChild = useRef(null);

  useEffect(() => {
    prizeDistListParent.current && autoAnimate(prizeDistListParent.current);
    prizeDistListChild.current && autoAnimate(prizeDistListChild.current);
  }, [prizeDistListParent, prizeDistListChild]);

  return (
    <div ref={prizeDistListParent}>
      <Box
        component={"ul"}
        className={styles.prizeDistList}
        ref={prizeDistListChild}
      >
        {prizeDistributions.map((prizeInfo, index) => (
          <Box className={styles.prizeDistItem} key={index} component='li'>
            #{index + 1}
            <TextField
              size='small'
              label='Place'
              variant='filled'
              value={prizeInfo.place}
              onChange={(e) => {
                setPrizeDistributions((prev) => {
                  return prev.map((item, itemIndex) => {
                    if (itemIndex === index) {
                      const newValue = Number(e.target.value);
                      if (isNaN(newValue)) return item;
                      return {
                        ...item,
                        place: newValue,
                      };
                    }
                    return item;
                  });
                });
              }}
            />
            <TextField
              size='small'
              label='Prize (type % to convert)'
              variant='filled'
              value={prizeInfo.prize}
              onChange={(e) => {
                setPrizeDistributions((prev) => {
                  return prev.map((item, itemIndex) => {
                    if (itemIndex === index) {
                      const newValue = Number(e.target.value);
                      if (isNaN(newValue) && !e.target.value.includes("%")) {
                        return item;
                      }
                      if (newValue === 0) {
                        return {
                          ...item,
                          prize: 0,
                        };
                      }
                      if (
                        (newValue >= 100 &&
                          newValue > availableMoney() * 100 + item.prize) ||
                        (newValue < 100 &&
                          newValue >
                            Math.round(availableMoney() * 100 + item.prize))
                      ) {
                        setSnackBarMessage("No available money will be left");
                        setIsOpenSnackbar(true);
                        return item;
                      }
                      if (e.target.value.includes("%")) {
                        return {
                          ...item,
                          prize: parseInt(e.target.value) * prizePool,
                        };
                      }
                      return {
                        ...item,
                        prize: newValue,
                      };
                    }
                    return item;
                  });
                });
              }}
            />
          </Box>
        ))}
      </Box>
    </div>
  );
};

PrizeDistributionFieldsComponent.displayName = "PrizeDistributionFields";

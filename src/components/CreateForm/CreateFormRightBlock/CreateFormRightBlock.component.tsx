import { useEffect, useRef, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import autoAnimate from "@formkit/auto-animate";

import { inputNumberOnChange } from "@utils/inputNumberOnChange";

import { PrizeDistributionCounter } from "../PrizeDistributionCounter";
import { SnackAlert } from "@components/SnackAlert";

import styles from "./CreateFormRightBlock.module.scss";
import { useTournamentsContext } from "../../../context/TournamentsData";
import { InputFields, Tournament } from "@customTypes/index";

export const CreateFormRightBlockComponent = () => {
  const { changeTournamentsData } = useTournamentsContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [entryFee, setEntryFee] = useState(-1);
  const [prizeDistributions, setPrizeDistributions] = useState([
    { place: 0, prize: 0 },
  ]);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const prizeDistListParent = useRef(null);
  const totalPrizeParent = useRef(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "all",
  });
  const prizePool = (numberOfPlayers * entryFee) / 100;
  const availableMoney = () => {
    return (
      prizePool -
      prizeDistributions.reduce((acc, item) => {
        return acc + item.prize / 100;
      }, 0)
    );
  };

  // const resetStates = () => {
  //   setTitle("");
  //   setDescription("");
  //   setNumberOfPlayers(0);
  //   setEntryFee(-1);
  //   setPrizeDistributions([{ place: 0, prize: 0 }]);
  // };

  const handleCreateTournament = async (data: FieldValues) => {
    const duplicateIndices = [] as number[];
    prizeDistributions.forEach((p, index, array) => {
      if (array.findIndex((q) => q.place === p.place) !== index) {
        duplicateIndices.push(index);
      }
    });
    if (duplicateIndices.length > 0) {
      setSnackBarMessage(`Duplicates in places: ${duplicateIndices.join(",")}`);
      setIsOpenSnackbar(true);
      return;
    }
    if (prizeDistributions.some((p) => p.place === 0)) {
      setSnackBarMessage("Prize distribution cant have place #0");
      setIsOpenSnackbar(true);
      return;
    }
    if (availableMoney() !== 0) {
      setSnackBarMessage("Must be no available money");
      setIsOpenSnackbar(true);
      return;
    }

    const newTournament: Tournament = {
      ...(data as InputFields),
      prizeDistribution: prizeDistributions,
    };

    await changeTournamentsData(newTournament);
    // resetStates();
  };

  useEffect(() => {
    prizeDistListParent.current && autoAnimate(prizeDistListParent.current);
    totalPrizeParent.current && autoAnimate(totalPrizeParent.current);
  }, [prizeDistListParent, totalPrizeParent]);

  return (
    <>
      <Box
        component='form'
        onSubmit={handleSubmit(handleCreateTournament)}
        className={styles.form}
      >
        <Typography
          fontSize={"2rem"}
          sx={{ fontWeight: "bold" }}
          component={"h2"}
        >
          Create tournament
        </Typography>
        <TextField
          size='small'
          label='Title'
          placeholder='from 5 up to 50 characters'
          variant='standard'
          error={!!errors["title"]}
          helperText={errors["title"] ? <>{errors["title"].message}</> : ""}
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 5,
              message: "Title must be from 5 up to 50 characters",
            },
            maxLength: {
              value: 50,
              message: "Title must be from 5 up to 50 characters",
            },
          })}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          multiline
          rows={4}
          size='small'
          label={`Description  ${
            100 - description.length >= 0 ? 100 - description.length : "no"
          } characters left`}
          placeholder='from 10 up to 100 characters'
          variant='standard'
          error={!!errors["description"]}
          helperText={
            errors["description"] ? <>{errors["description"].message}</> : ""
          }
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be from 10 up to 100 characters",
            },
            maxLength: {
              value: 100,
              message: "Description must be from 10 up to 100 characters",
            },
          })}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          size='small'
          label='Number of players'
          placeholder='from 2 to 100'
          variant='standard'
          error={!!errors["numberOfPlayers"]}
          helperText={
            errors["numberOfPlayers"] ? (
              <>{errors["numberOfPlayers"].message}</>
            ) : (
              ""
            )
          }
          {...register("numberOfPlayers", {
            required: "Enter number of players",
            min: {
              value: 2,
              message: "Number of players must be from 2 up to 100",
            },
            max: {
              value: 100,
              message: "Number of players must be from 2 up to 100",
            },
          })}
          value={numberOfPlayers > 0 ? numberOfPlayers : ""}
          onChange={(e) => inputNumberOnChange(e, setNumberOfPlayers)}
        />
        <TextField
          size='small'
          label='Entry fee (cents)'
          placeholder='from 0 to 1000'
          variant='standard'
          error={!!errors["entryFee"]}
          helperText={
            errors["entryFee"] ? <>{errors["entryFee"].message}</> : ""
          }
          {...register("entryFee", {
            required: "Entry fee is required",
            minLength: {
              value: 0,
              message: "Entry fee must be from 0 up to 1000 characters",
            },
            maxLength: {
              value: 1000,
              message: "Entry fee must be from 0 up to 1000 characters",
            },
          })}
          value={entryFee >= 0 ? entryFee : ""}
          onChange={(e) => inputNumberOnChange(e, setEntryFee)}
        />

        <PrizeDistributionCounter
          numberOfPlayers={numberOfPlayers}
          prizeDistAmount={prizeDistributions.length}
          setPrizeDistAmount={setPrizeDistributions}
          setIsOpenSnackbar={setIsOpenSnackbar}
          setSnackBarMessage={setSnackBarMessage}
        />

        <Box
          component={"ul"}
          className={styles.prizeDistList}
          ref={prizeDistListParent}
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
                          newValue / 100 > availableMoney() ||
                          (e.target.value.includes("%") &&
                            (parseInt(e.target.value) / 100) *
                              availableMoney() >
                              availableMoney())
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

        <div ref={totalPrizeParent}>
          {entryFee > 0 && numberOfPlayers > 0 && (
            <Typography
              fontSize={"1.1rem"}
              sx={{
                fontWeight: "bold",
              }}
            >
              Prize pool: {prizePool}$ <br /> Available money:{" "}
              {availableMoney() ?? prizePool}$
            </Typography>
          )}
        </div>

        <Button
          type='submit'
          variant='contained'
          color='primary'
          sx={{
            alignSelf: "center",
            "&:hover": {
              backgroundColor: "var(--primary-hover)",
            },
          }}
        >
          Submit
        </Button>
      </Box>

      <SnackAlert
        open={isOpenSnackbar}
        handleClose={() => setIsOpenSnackbar(false)}
        severity='error'
        message={snackBarMessage}
      />
    </>
  );
};

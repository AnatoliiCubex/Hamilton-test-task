import { useEffect, useRef, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import autoAnimate from "@formkit/auto-animate";

import { inputNumberOnChange } from "@utils/inputNumberOnChange";

import { PrizeDistributionCounter } from "../PrizeDistributionCounter";

import styles from "./CreateFormRightBlock.module.scss";

export const CreateFormRightBlockComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [entryFee, setEntryFee] = useState(-1);
  const [prizeDistributions, setPrizeDistributions] = useState([
    { place: 0, prize: "0" },
  ]);

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
        if (item.prize.includes("%")) {
          return acc + (parseInt(item.prize) / 100) * prizePool;
        }
        return acc + parseInt(item.prize) / 100;
      }, 0)
    );
  };

  const handleCreateTournament = (data: FieldValues) => {
    console.log(data);
  };

  useEffect(() => {
    prizeDistListParent.current && autoAnimate(prizeDistListParent.current);
    totalPrizeParent.current && autoAnimate(totalPrizeParent.current);
  }, [prizeDistListParent, totalPrizeParent]);

  return (
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
        size='small'
        label='Description'
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
        helperText={errors["entryFee"] ? <>{errors["entryFee"].message}</> : ""}
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
              label='Prize (for percent add %)'
              variant='filled'
              value={prizeInfo.prize}
              onChange={(e) => {
                setPrizeDistributions((prev) => {
                  return prev.map((item, itemIndex) => {
                    if (itemIndex === index) {
                      const newValue = Number(e.target.value);
                      if (isNaN(newValue) && !e.target.value.includes("%"))
                        return item;
                      return {
                        ...item,
                        prize: e.target.value,
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
            {availableMoney() || prizePool}$
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
  );
};

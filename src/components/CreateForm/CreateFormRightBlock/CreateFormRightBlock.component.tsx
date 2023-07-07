import { useEffect, useRef, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import autoAnimate from "@formkit/auto-animate";

import { useTournamentsContext } from "../../../context/TournamentsData";
import { InputFields, PrizeDistribution, Tournament } from "@customTypes/index";

import { PrizeDistributionCounter } from "../PrizeDistributionCounter";
import { SnackAlert } from "@components/SnackAlert";
import { FormInputFields } from "../FormInputFieldsComponent";

import styles from "./CreateFormRightBlock.module.scss";
import { PrizeDistributionFields } from "../PrizeDistributionFields";

export const CreateFormRightBlockComponent = () => {
  const { tournamentsData, changeTournamentsData } = useTournamentsContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [entryFee, setEntryFee] = useState(-1);
  const [prizeDistributions, setPrizeDistributions] = useState(
    [] as PrizeDistribution[]
  );
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [isOpenSuccessBar, setIsOpenSuccessBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

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

  const resetStates = () => {
    setTitle("");
    setDescription("");
    setNumberOfPlayers(0);
    setEntryFee(-1);
    setPrizeDistributions([{ place: 0, prize: 0 }]);
  };

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
    if (entryFee > 0 && prizeDistributions.some((p) => p.place === 0)) {
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
      id: tournamentsData.length + 1,
      ...(data as InputFields),
      prizeDistribution: prizeDistributions,
    };

    changeTournamentsData(newTournament);
    setIsOpenSuccessBar(true);
    resetStates();
  };

  useEffect(() => {
    totalPrizeParent.current && autoAnimate(totalPrizeParent.current);
  }, [totalPrizeParent]);

  return (
    <>
      <Box
        component='form'
        onSubmit={handleSubmit(handleCreateTournament)}
        className={styles.form}
      >
        <FormInputFields
          register={register}
          errors={errors}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          numberOfPlayers={numberOfPlayers}
          setNumberOfPlayers={setNumberOfPlayers}
          entryFee={entryFee}
          setEntryFee={setEntryFee}
        />

        {numberOfPlayers >= 2 && entryFee > 0 && (
          <PrizeDistributionCounter
            numberOfPlayers={numberOfPlayers}
            prizeDistAmount={prizeDistributions.length}
            setPrizeDistAmount={setPrizeDistributions}
            setIsOpenSnackbar={setIsOpenSnackbar}
            setSnackBarMessage={setSnackBarMessage}
          />
        )}

        {numberOfPlayers >= 2 && entryFee > 0 && (
          <PrizeDistributionFields
            prizeDistributions={prizeDistributions}
            setPrizeDistributions={setPrizeDistributions}
            availableMoney={availableMoney}
            setSnackBarMessage={setSnackBarMessage}
            setIsOpenSnackbar={setIsOpenSnackbar}
            prizePool={prizePool}
          />
        )}

        <div ref={totalPrizeParent}>
          {entryFee > 0 && numberOfPlayers > 0 && (
            <Typography
              fontSize={"1.1rem"}
              sx={{
                fontWeight: "bold",
              }}
            >
              Prize pool: {prizePool}$ <br /> Available money:{" "}
              {availableMoney().toFixed(2) ?? prizePool}$
            </Typography>
          )}
        </div>

        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={styles.submitButton}
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
      <SnackAlert
        open={isOpenSuccessBar}
        handleClose={() => setIsOpenSuccessBar(false)}
        message={"Tournament added"}
      />
    </>
  );
};

import { Box, Typography, TextField } from "@mui/material";
import { inputNumberOnChange } from "@utils/inputNumberOnChange";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

type Props = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  numberOfPlayers: number;
  setNumberOfPlayers: Dispatch<SetStateAction<number>>;
  entryFee: number;
  setEntryFee: Dispatch<SetStateAction<number>>;
};
export const FormInputFieldsComponent: React.FC<Props> = ({
  register,
  errors,
  title,
  setTitle,
  description,
  setDescription,
  numberOfPlayers,
  setNumberOfPlayers,
  entryFee,
  setEntryFee,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginBottom: "1rem",
      }}
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
        label={`Description  (${
          100 - description.length > 0 ? 100 - description.length : "no"
        } characters left)`}
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
    </Box>
  );
};

FormInputFieldsComponent.displayName = "FormInputFields";

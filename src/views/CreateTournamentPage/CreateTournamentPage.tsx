import { Box } from "@mui/material";
import styles from "./CreateTournamentPage.module.scss";
import { CreateFormLeftBlock } from "@components/CreateForm/CreateFormLeftBlock";
import { CreateFormRightBlock } from "@components/CreateForm/CreateFormRightBlock";

export const CreateTournamentPageComponent = () => {
  return (
    <Box className={styles.formContainer}>
      <CreateFormLeftBlock />
      <CreateFormRightBlock />
    </Box>
  );
};

CreateTournamentPageComponent.displayName = "CreateTournamentPage";

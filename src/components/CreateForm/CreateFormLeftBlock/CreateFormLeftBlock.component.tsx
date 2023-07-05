import { Box, Typography } from "@mui/material";

import styles from "./CreateFormLeftBlock.module.scss";

export const CreateFormLeftBlockComponent = () => {
  return (
    <Box className={styles.formImage}>
      <Typography
        fontSize={"4rem"}
        sx={{ fontWeight: "bold", color: "white" }}
        component={"h1"}
      >
        Hamilton.
      </Typography>
      <Typography
        fontSize={"1.5rem"}
        sx={{ fontWeight: "bold", color: "white" }}
      >
        Create tournaments for you wish.
      </Typography>
      <Typography fontSize={"1rem"} sx={{ color: "white" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id tenetur
        voluptates molestiae optio quas voluptate cum quisquam ea, libero
        corrupti reprehenderit repellat fugit rem expedita eveniet, dicta magni
        dolorum ratione!
      </Typography>
    </Box>
  );
};

CreateFormLeftBlockComponent.displayName = "CreateFormLeftBlock";

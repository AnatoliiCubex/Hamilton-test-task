import Link from "next/link";
import styles from "./Header.module.scss";
import { Container, Typography } from "@mui/material";

export const HeaderComponent = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <Link href='/create-tournament'>
          <Typography fontWeight={"bold"}>Create tournament</Typography>
        </Link>

        <Link href='/tournaments-table'>
          <Typography fontWeight={"bold"}>Tournaments table</Typography>
        </Link>
      </Container>
    </header>
  );
};

HeaderComponent.displayName = "HeaderComponent";

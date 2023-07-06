import { Box } from "@mui/material";
import { useTournamentsContext } from "../../context/TournamentsData";

import styles from "./TournamentPage.module.scss";

type Props = {
  id: number;
};
export const TournamentPageComponent: React.FC<Props> = ({ id }) => {
  const { tournamentsData } = useTournamentsContext();
  const tournamentObj = tournamentsData.find((t) => t.id === id);
  const prizePool = tournamentObj?.prizeDistribution.reduce((acc, item) => {
    return acc + item.prize;
  }, 0);

  return (
    <Box className={styles.tournamentPage}>
      <Box component={"h1"} sx={{ textTransform: "capitalize" }}>
        #{tournamentObj?.id} {tournamentObj?.title}
      </Box>
      <Box component={"h2"}>Description: {tournamentObj?.description}</Box>
      <Box component={"h2"}>Prize pool: {prizePool && prizePool / 100}$</Box>
      <Box component={"h2"}>
        {tournamentObj?.prizeDistribution.length ? (
          <>
            Prize distributions:{" "}
            {tournamentObj?.prizeDistribution.map((p, i) => (
              <div key={i}>
                #{p.place} - {p.prize / 100}$
              </div>
            ))}
          </>
        ) : (
          "No prize distributions"
        )}
      </Box>
    </Box>
  );
};

TournamentPageComponent.displayName = "TournamentPage";

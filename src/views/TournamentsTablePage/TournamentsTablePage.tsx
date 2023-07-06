import { useEffect, useState } from "react";
import { useTournamentsContext } from "../../context/TournamentsData";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import { SnackAlert } from "@components/SnackAlert";

export const TournamentsTablePageComponent = () => {
  const { tournamentsData } = useTournamentsContext();
  const [data, setData] = useState(tournamentsData);
  const [isCopiedId, setIsCopiedId] = useState(false);

  const handleCopyTournamentId = (id: string) => {
    setIsCopiedId(true);
    navigator.clipboard.writeText(id);
  };

  useEffect(() => setData(tournamentsData), [tournamentsData]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='tournaments-table' sx={{ whiteSpace: "nowrap" }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Number of players</TableCell>
              <TableCell>Entry fee</TableCell>
              <TableCell>Total prize pool</TableCell>
              <TableCell>Number of winners</TableCell>
              <TableCell>Tournament page</TableCell>
              <TableCell>Remove last prize</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ paddingLeft: "0.4rem" }}>
                  <IconButton
                    onClick={() => handleCopyTournamentId(`${i + 1}`)}
                    size='small'
                    sx={{
                      color: "var(--primary)",
                      fontWeight: "bold",
                      padding: "0.7rem",
                      borderRadius: "50%",
                      fontSize: "1.1rem",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {i + 1}
                  </IconButton>
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell
                  sx={{ maxWidth: "300px", wordWrap: "break-word !important" }}
                >
                  {row.description}
                </TableCell>
                <TableCell>{row.numberOfPlayers}</TableCell>
                <TableCell>{row.entryFee}</TableCell>
                <TableCell>
                  {row.prizeDistribution.reduce((acc, item) => {
                    return acc + item.prize / 100;
                  }, 0)}
                  $
                </TableCell>
                <TableCell>{row.prizeDistribution.length}</TableCell>
                <TableCell>
                  <Button variant='contained'>Page</Button>
                </TableCell>
                <TableCell>
                  <Button variant='contained'>Remove last prize</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SnackAlert
        open={isCopiedId}
        handleClose={() => setIsCopiedId(false)}
        message='ID copied!'
      />
    </>
  );
};
TournamentsTablePageComponent.displayName = "TournamentsTablePage";

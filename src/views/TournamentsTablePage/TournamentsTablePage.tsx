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

export const TournamentsTablePageComponent = () => {
  const { tournamentsData } = useTournamentsContext();
  console.log(tournamentsData);
  return (
    <TableContainer component={Paper}>
      <Table aria-label='tournaments-table'>
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
          {tournamentsData.map((row, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <IconButton size='small' sx={{ color: "var(--primary)" }}>
                  {i + 1}
                </IconButton>
              </TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.description}</TableCell>
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
                <Button variant='text'>Page</Button>
              </TableCell>
              <TableCell>
                <Button variant='text'>Remove last prize</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
TournamentsTablePageComponent.displayName = "TournamentsTablePage";

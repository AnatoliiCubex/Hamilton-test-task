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
  TableSortLabel,
} from "@mui/material";
import { SnackAlert } from "@components/SnackAlert";

type SortConfig = {
  key: string;
  direction?: "asc" | "desc";
};
export const TournamentsTablePageComponent = () => {
  const { tournamentsData } = useTournamentsContext();
  const [data, setData] = useState(tournamentsData);
  const [isCopiedId, setIsCopiedId] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "",
    direction: "asc",
  });

  const handleCopyTournamentId = (id: string) => {
    setIsCopiedId(true);
    navigator.clipboard.writeText(id);
  };

  const sortData = (key: string) => {
    let direction: SortConfig["direction"] = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    const sortedData = [...tournamentsData].sort((a, b) => {
      if (sortConfig.key === "id") {
        return sortConfig.direction === "asc" ? a.id - b.id : b.id - a.id;
      } else if (sortConfig.key === "title") {
        return sortConfig.direction === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return 0;
    });
    setData(sortedData);
  }, [sortConfig]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='tournaments-table' sx={{ whiteSpace: "nowrap" }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "id"}
                  direction={sortConfig.direction}
                  onClick={() => sortData("id")}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "title"}
                  direction={sortConfig.direction}
                  onClick={() => sortData("title")}
                >
                  Title
                </TableSortLabel>
              </TableCell>
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
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ paddingLeft: "0.4rem" }}>
                  <IconButton
                    onClick={() => handleCopyTournamentId(`${row.id}`)}
                    size='small'
                    sx={{
                      color: "var(--primary)",
                      fontWeight: "bold",
                      padding: "0.7rem",
                      fontSize: "1.1rem",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {row.id}
                  </IconButton>
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell
                  sx={{
                    maxWidth: "300px",
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                  }}
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

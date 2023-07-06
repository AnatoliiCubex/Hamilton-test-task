import { useEffect, useState, useRef } from "react";
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
import { Tournament } from "@customTypes/index";
import autoAnimate from "@formkit/auto-animate";

type SortConfig = {
  key: keyof Tournament | "numberOfWinners" | "totalPrizePool";
  direction?: "asc" | "desc";
};
export const TournamentsTablePageComponent = () => {
  const tableRef = useRef(null);
  const { tournamentsData } = useTournamentsContext();
  const [data, setData] = useState(tournamentsData);
  const [isCopiedId, setIsCopiedId] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "id",
    direction: "asc",
  });

  const handleCopyTournamentId = (id: string) => {
    setIsCopiedId(true);
    navigator.clipboard.writeText(id);
  };

  const sortData = (key: SortConfig["key"]) => {
    let direction: SortConfig["direction"] = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    const sortedData = [...tournamentsData].sort((a, b) => {
      if (sortConfig.key === "title" || sortConfig.key === "description") {
        return sortConfig.direction === "asc"
          ? a[sortConfig.key].localeCompare(b[sortConfig.key])
          : b[sortConfig.key].localeCompare(a[sortConfig.key]);
      } else if (sortConfig.key === "numberOfWinners") {
        return a.prizeDistribution.length - b.prizeDistribution.length;
      } else if (sortConfig.key === "totalPrizePool") {
        const aTotalPrizePool = a.prizeDistribution.reduce(
          (acc, item) => acc + item.prize / 100,
          0
        );
        const bTotalPrizePool = b.prizeDistribution.reduce(
          (acc, item) => acc + item.prize / 100,
          0
        );
        return sortConfig.direction === "asc"
          ? aTotalPrizePool - bTotalPrizePool
          : bTotalPrizePool - aTotalPrizePool;
      }
      return sortConfig.direction === "asc"
        ? Number(a[sortConfig.key]) - Number(b[sortConfig.key])
        : Number(b[sortConfig.key]) - Number(a[sortConfig.key]);
    });
    setData(sortedData);
  }, [sortConfig]);

  useEffect(() => {
    tableRef.current && autoAnimate(tableRef.current);
  }, [tableRef]);

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
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "description"}
                  direction={sortConfig.direction}
                  onClick={() => sortData("description")}
                >
                  Description
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "numberOfPlayers"}
                  direction={sortConfig.direction}
                  onClick={() => sortData("numberOfPlayers")}
                >
                  Number of players
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "entryFee"}
                  direction={sortConfig.direction}
                  onClick={() => sortData("entryFee")}
                >
                  Entry fee
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "totalPrizePool"}
                  direction={sortConfig.direction}
                  onClick={() => sortData("totalPrizePool")}
                >
                  Total prize pool
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "numberOfWinners"}
                  direction={sortConfig.direction}
                  onClick={() => sortData("numberOfWinners")}
                >
                  Number of winners
                </TableSortLabel>
              </TableCell>
              <TableCell>Tournament page</TableCell>
              <TableCell>Remove last prize</TableCell>
            </TableRow>
          </TableHead>
          <TableBody ref={tableRef}>
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

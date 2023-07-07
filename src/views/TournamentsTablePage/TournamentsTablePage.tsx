import React, { useEffect, useState, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import Link from "next/link";
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

import { Tournament } from "@customTypes/index";
import { headerCellData } from "./constants";
import { useTournamentsContext } from "../../context/TournamentsData";

import { SnackAlert } from "@components/SnackAlert";

type SortConfig = {
  key: keyof Tournament | "numberOfWinners" | "totalPrizePool";
  direction?: "asc" | "desc";
};
export const TournamentsTablePageComponent = () => {
  const tableRef = useRef(null);
  const { tournamentsData, removeLastPrize } = useTournamentsContext();
  const [data, setData] = useState(tournamentsData);
  const [isOpenSnackBar, setIsOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "id",
    direction: "asc",
  });

  const handleCopyTournamentId = (id: string) => {
    setIsOpenSnackBar(true);
    setSnackBarMessage("ID Copied");
    navigator.clipboard.writeText(id);
  };

  const sortData = (key: SortConfig["key"]) => {
    let direction: SortConfig["direction"] = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleRemoveLastPrize = (id: number) => {
    removeLastPrize(id);
    setIsOpenSnackBar(true);
    setSnackBarMessage("Removed last prize");
  };

  useEffect(() => {
    const sortedData = [...tournamentsData].sort((a, b) => {
      if (sortConfig.key === "title" || sortConfig.key === "description") {
        return sortConfig.direction === "asc"
          ? a[sortConfig.key].localeCompare(b[sortConfig.key])
          : b[sortConfig.key].localeCompare(a[sortConfig.key]);
      } else if (sortConfig.key === "numberOfWinners") {
        return sortConfig.direction === "asc"
          ? a.prizeDistribution.length - b.prizeDistribution.length
          : b.prizeDistribution.length - a.prizeDistribution.length;
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

  useEffect(() => setData(tournamentsData), [tournamentsData]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='tournaments-table' sx={{ whiteSpace: "nowrap" }}>
          <TableHead>
            <TableRow>
              {headerCellData.map((cell, i) => (
                <React.Fragment key={i}>
                  {cell.key ? (
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === cell.key}
                        direction={sortConfig.direction}
                        onClick={() => sortData(cell.key as SortConfig["key"])}
                      >
                        {cell.title}
                      </TableSortLabel>
                    </TableCell>
                  ) : (
                    <TableCell>{cell.title}</TableCell>
                  )}
                </React.Fragment>
              ))}
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
                  <Link href={`tournament/${row.id}`}>
                    <Button variant='contained'>Page</Button>
                  </Link>
                </TableCell>
                {row.prizeDistribution.length > 0 ? (
                  <TableCell>
                    <Button
                      variant='contained'
                      onClick={() => handleRemoveLastPrize(row.id)}
                    >
                      Remove last prize
                    </Button>
                  </TableCell>
                ) : (
                  <TableCell />
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SnackAlert
        open={isOpenSnackBar}
        handleClose={() => setIsOpenSnackBar(false)}
        message={snackBarMessage}
      />
    </>
  );
};

TournamentsTablePageComponent.displayName = "TournamentsTablePage";

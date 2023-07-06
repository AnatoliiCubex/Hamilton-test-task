import React, { ReactNode, useContext, useMemo, useState } from "react";
import { Tournament, TournamentsData } from "@customTypes/index";
import { tournamentsDefaultData } from "../constants";

export type TournamentsDataContextType = {
  tournamentsData: TournamentsData;
  changeTournamentsData: (data: Tournament) => void;
  removeLastPrize: (id: number) => void;
};

export const tournamentsDataDefaultValues: TournamentsDataContextType = {
  tournamentsData: [] as TournamentsData,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changeTournamentsData: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeLastPrize: () => {},
};

const TournamentsDataContext = React.createContext<TournamentsDataContextType>(
  tournamentsDataDefaultValues
);

export function useTournamentsContext() {
  return useContext(TournamentsDataContext);
}

type Props = {
  children: ReactNode;
};
export function TournamentsDataProvider({ children }: Props) {
  const [tournamentsData, setTournamentsData] = useState(
    tournamentsDefaultData
  );

  const changeTournamentsData = (data: Tournament) => {
    setTournamentsData((prev) => [...prev, data]);
  };

  const removeLastPrize = (id: number) => {
    setTournamentsData((prev) => {
      const tournamentIndex = prev.findIndex((t) => t.id === id);
      if (tournamentIndex === -1) {
        return prev; // Tournament with the specified ID not found
      }

      const tournament = prev[tournamentIndex];
      const poppedPrize = tournament.prizeDistribution.pop();
      if (!poppedPrize) {
        return prev; // No prize to remove
      }

      const updatedTournament: Tournament = {
        ...tournament,
        prizeDistribution: tournament.prizeDistribution
          .filter((prize) => prize !== poppedPrize)
          .map((p, i) =>
            i === 0
              ? {
                  ...p,
                  prize: p.prize + poppedPrize.prize,
                }
              : p
          ),
      };

      const updatedTournaments = [...prev];
      updatedTournaments[tournamentIndex] = updatedTournament;
      return updatedTournaments;
    });
  };

  const value = useMemo(
    () => ({
      tournamentsData,
      changeTournamentsData,
      removeLastPrize,
    }),
    [tournamentsData]
  );

  return (
    <>
      <TournamentsDataContext.Provider value={value}>
        {children}
      </TournamentsDataContext.Provider>
    </>
  );
}

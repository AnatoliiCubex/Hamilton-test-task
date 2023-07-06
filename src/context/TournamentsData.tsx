import React, { ReactNode, useContext, useMemo, useState } from "react";
import { Tournament } from "@customTypes/index";

export type TournamentsDataContextType = {
  tournamentsData: Tournament;
  changeTournamentsData: (data: Tournament) => void;
};

export const tournamentsDataDefaultValues: TournamentsDataContextType = {
  tournamentsData: {} as Tournament,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changeTournamentsData: () => {},
};

const TournamentsDataContext = React.createContext<TournamentsDataContextType>(
  tournamentsDataDefaultValues
);

export function useTournamentsData() {
  return useContext(TournamentsDataContext);
}

type Props = {
  children: ReactNode;
};
export function TournamentsDataProvider({ children }: Props) {
  const [tournamentsData, setTournamentsData] = useState({} as Tournament);

  const changeTournamentsData = (data: Tournament) => {
    setTournamentsData(data);
  };

  const value = useMemo(
    () => ({
      tournamentsData,
      changeTournamentsData,
    }),
    []
  );

  return (
    <>
      <TournamentsDataContext.Provider value={value}>
        {children}
      </TournamentsDataContext.Provider>
    </>
  );
}

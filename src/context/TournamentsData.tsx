import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Tournament, TournamentsData } from "@customTypes/index";
import { tournamentsDefaultData } from "../constants";

export type TournamentsDataContextType = {
  tournamentsData: TournamentsData;
  changeTournamentsData: (data: Tournament) => void;
};

export const tournamentsDataDefaultValues: TournamentsDataContextType = {
  tournamentsData: [] as TournamentsData,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changeTournamentsData: () => {},
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
    setTournamentsData((prev) => [
      ...prev,
      { ...data, id: tournamentsData.length },
    ]);
  };

  useEffect(() => console.log(tournamentsData), [tournamentsData]);

  const value = useMemo(
    () => ({
      tournamentsData,
      changeTournamentsData,
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

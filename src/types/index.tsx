export type TournamentsData = Tournament[];

export type Tournament = {
  id: number;
  title: string;
  description: string;
  numberOfPlayers: number;
  entryFee: number;
  prizeDistribution: PrizeDistribution[];
};

export type PrizeDistribution = {
  place: number;
  prize: number;
};

export type InputFields = {
  title: string;
  description: string;
  numberOfPlayers: number;
  entryFee: number;
};

export type Tournament = {
  title: string;
  description: string;
  numberOfPlayers: number;
  entryFee: number;
  prizeDistribution: {
    place: number;
    prize: number;
  }[];
};

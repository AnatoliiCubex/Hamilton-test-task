import dynamic from "next/dynamic";

const CreateTournamentPage = dynamic(() =>
  import("@views/CreateTournamentPage").then((mod) => mod.CreateTournamentPage)
);
export default function CreateTournament() {
  return <CreateTournamentPage />;
}

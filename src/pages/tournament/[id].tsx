import { TournamentPage } from "@views/TournamentPage";
import { useRouter } from "next/router";
import { useTournamentsContext } from "../../context/TournamentsData";

export default function Tournament() {
  const { tournamentsData } = useTournamentsContext();
  const router = useRouter();
  const id = Number(router.query.id);

  if (!tournamentsData.find((t) => t.id === id)) {
    return null;
  }

  return <TournamentPage id={id} />;
}

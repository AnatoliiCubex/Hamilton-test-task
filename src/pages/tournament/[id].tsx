import { TournamentPage } from "@views/TournamentPage";
import { useRouter } from "next/router";

export default function Tournament() {
  const router = useRouter();
  const id = Number(router.query.id);

  return <TournamentPage id={id} />;
}

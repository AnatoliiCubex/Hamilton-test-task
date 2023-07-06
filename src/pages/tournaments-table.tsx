import dynamic from "next/dynamic";

const TournamentsTablePage = dynamic(() =>
  import("@views/TournamentsTablePage").then((mod) => mod.TournamentsTablePage)
);
export default function TournametsTable() {
  return <TournamentsTablePage />;
}

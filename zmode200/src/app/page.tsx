import { getRaces,getRaceResult } from "./lib/api/jolpica";
import RaceSelector from "@/components/race/RaceSelector";
import RaceResultsTable from "@/components/race/RaceResultsTable";



export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ round?: string }>;
}) {
  const {round = "1"}= await searchParams;
  
  const races = await getRaces(2025);
  const results = await getRaceResult(2025, round);

  return (
    <main>
      <h1>ZMode200</h1>
      <RaceSelector races={races} selectedRound={round} />
      <RaceResultsTable results={results} />
    </main>
  );
}
 

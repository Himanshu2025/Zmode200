import { getRaces,getRaceResult, getLaps } from "../lib/api/jolpica";
import RaceSelector from "@/components/race/RaceSelector";
import RaceResultsTable from "@/components/race/RaceResultsTable";
import LapChart from "@/components/race/LapChart";
import { DriverLap} from "./types/f1";
import { transformLaps } from "@/lib/transformlaps";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ round?: string }>;
}) {
  const {round = "1"}= await searchParams;
  
  const races = await getRaces(2025);
  const results = await getRaceResult(2025, round);
  const laps = await getLaps(2025, round)
  const driverLaps: DriverLap[] = transformLaps(laps); 

  return (
    <main>
      <h1>ZMode200</h1>
      <RaceSelector races={races} selectedRound={round} />
      <RaceResultsTable results={results} />
      <LapChart laps={driverLaps}/>
    </main>
  );
}
 

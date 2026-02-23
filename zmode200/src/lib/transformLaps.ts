
import { LapTime,DriverLap } from "@/app/types/f1";

function timeToSeconds(time: string): number {
    const [minPart, secPart] = time.split(":"); 

    return parseInt(minPart)*60 + parseInt(secPart); 

}

export function secondsToTime(seconds: number | undefined): string {
  if ( seconds === undefined) return ""; 
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(3);
  return `${mins}:${secs.padStart(6, "0")}`;
}

export function transformLaps(rawLaps: LapTime[]): DriverLap[] {
  return rawLaps.flatMap((lap) =>
    lap.Timings.map((timing) => ({
      lap: parseInt(lap.number),
      driver: timing.driverId,
      time: timeToSeconds(timing.time),
    }))
  );
}


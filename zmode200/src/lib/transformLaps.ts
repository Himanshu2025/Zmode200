
import { LapTime } from "@/app/types/f1";

function timeToSeconds(time: string): number {
    const [minPart, secPart] = time.split(":"); 

    return parseInt(minPart)*60 + parseInt(secPart); 

}

export function secondsToTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(3);
  return `${mins}:${secs.padStart(6, "0")}`;
}

export function transformLaps(laps: LapTime[]): Record<string, unknown>[] {
  return laps.map((lap) => {
    const entry: Record<string, unknown> = { lap: parseInt(lap.number) };
    lap.Timings.forEach((timing) => {
      entry[timing.driverId] = timeToSeconds(timing.time);
    });
    return entry;
  });
}


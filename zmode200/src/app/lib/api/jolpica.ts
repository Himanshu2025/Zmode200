import { PitStop, QualifyingResult, Race } from "@/app/types/f1";
import { RaceResult } from "@/app/types/f1";
import { LapTime } from "@/app/types/f1";
import { DriverStanding } from "@/app/types/f1";
import { Driver } from "@/app/types/f1";

const BASE_URL="https://api.jolpi.ca/ergast/f1/";

export async function fetchF1<T>(
    endpoint: string, 
    params?:Record<string,string>,
    revalidate: number = 3600 ): Promise<T>{
    
    const url = new URL(`${BASE_URL}${endpoint}.json`)
    url.searchParams.set("limit","100"); 

    if (params) {
        Object.entries(params).forEach(([key,value]) => 
        url.searchParams.set(key,value))
    }

    const res = await fetch(url.toString(), {
        next: { revalidate: revalidate}
    }); 

    if (!res.ok){
        throw new Error (`F1 API Error: ${res.json} - ${url.toString()}`)
    }

    const json = await res.json(); 
    return json.MRData as T; 

}

// fetching the races data 
export async function getRaces(year: string | number): Promise<Race[]> {

    const data = await fetchF1<{
        RaceTable: { 
            Races: Race[]}}>(`${year}`);
    
    return data.RaceTable.Races; 
    
}

export async function getRaceResult(year: string | number, round: string | number): Promise<RaceResult[]> {
  
  const data = await fetchF1<{ RaceTable: 
    { Races: 
        (Race & 
            { Results: 
                RaceResult[] })[] } }>(`/${year}/${round}/results`);
  return data.RaceTable.Races[0].Results;
}

export async function getQualifying(year: string | number, round: string | number): Promise<QualifyingResult[]> {
  const data = await fetchF1<{ RaceTable: 
    { Races: 
        (Race & 
            { QualifyingResults: 
                QualifyingResult[] })[] } }>(`/${year}/${round}/qualifying`);
  return data.RaceTable.Races[0].QualifyingResults;
}

export async function getLaps(year: string | number, round: string | number): Promise<LapTime[]> {
  const data = await fetchF1<{ RaceTable: 
    { Races: 
        (Race & 
            { Laps: 
                LapTime[] })[] } }>(`/${year}/${round}/laps`, undefined, Infinity);
  
        return data.RaceTable.Races[0].Laps;
}

export async function getPitStops(year: string | number, round: string | number): Promise<PitStop[]> {
  const data = await fetchF1<{ RaceTable: 
    { Races: (Race & 
        { PitStops: PitStop[] })[] } }>(`/${year}/${round}/pitstops`);
  return data.RaceTable.Races[0].PitStops;
}

export async function getDriverStandings(year: string | number): Promise<DriverStanding[]> {
  const data = await fetchF1<{ StandingsTable: 
    { StandingsLists: 
        { DriverStandings: 
            DriverStanding[] }[] } }>(`/${year}/driverStandings`);
  return data.StandingsTable.StandingsLists[0].DriverStandings;
}

export async function getDrivers(year: string | number): Promise<Driver[]> {
  const data = await fetchF1<{ 
    DriverTable: 
    { Drivers: 
        Driver[] } }>(`/${year}/drivers`);
  return data.DriverTable.Drivers;
}
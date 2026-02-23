// All interfaces mirror the exact Jolpica-F1 API response shapes.
// Reference: https://api.jolpi.ca/ergast/f1/

export interface Driver {
    driverId : string;
    permanentNumber: string; 
    code: string;
    url: string;
    givenName: string; 
    familyName: string; 
    dateOfBirth: string;
    nationality: string;
}


export interface Constructor {
    constructorId: string; 
    url: string; 
    name: string; 
    nationality: string;
}


export interface Location { 
    lat: string; 
    long: string; 
    locality: string; 
    country: string; 
}
export interface Circuit {
    circuitId: string; 
    url: string; 
    circuitName: string; 
    Location: Location; 
}


export interface Race {
    season: string; 
    round: string; 
    raceName: string; 
    date: string; 
    time?: string; 
    Circuit: Circuit; 
}

export interface RaceResult {
    position: string; 
    points: string; 
    Driver: Driver; 
    Constructor: Constructor; 
    grid: number; 
    laps: string; 
    status: string; 
    FastestLap?: {
        lap: string; 
        Time: { time: string}; 
        AverageSpeed: { speed: string}
    }; 
}

export interface QualifyingResult {
   position: string; 
   Driver: Driver; 
   Constructor: Constructor; 
   Q1?: string; 
   Q2?: string; 
   Q3?: string; 
}

export interface PitStop {
    driverId: string; 
    lap: number; 
    position: number; 
    time: string; 
    duration: string; 
}

export interface LapTime {
    driverId: string; 
    lap: number; 
    position: number; 
    time: string; 
    milliseconds: number; 
}

export interface DriverStanding {
    position: string; 
    points: string; 
    wins: string; 
    Driver: Driver; 
    Constructors: Constructor[]; 
}

export type F1Response<T> = {
    xmlns: string; 
    series: string; 
    url: string; 
    limit: string; 
    offset: string; 
    total: string; 
} & T; 
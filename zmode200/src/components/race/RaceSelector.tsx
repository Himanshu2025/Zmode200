"use client"

import { Race } from "@/app/types/f1";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useRouter } from "next/navigation";


interface RaceSelectorProps {
    races: Race[]; 
    selectedRound: string; 
}




export default function RaceSelector( {races, selectedRound } : RaceSelectorProps ){
    
    const router = useRouter(); 

    function handleSelect(round: string) {
        router.push(`?round=${round}`); 
    }

    return(
        <div>
            <Select onValueChange={handleSelect} defaultValue={selectedRound}>
                
                <SelectTrigger>
                    <SelectValue placeholder=" Select a race"/>
                </SelectTrigger>

                <SelectContent>
                    {races.map((race) => (
                        <SelectItem key={race.round} value={race.round}}>
                            {race.raceName }
                        </SelectItem>
                    ))}
                </SelectContent>

            </Select>
        </div>
    )
}


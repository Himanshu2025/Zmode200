import { RaceResult } from "@/app/types/f1";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RaceResultsTableProps {
  results: RaceResult[];
}

export default function RaceResultsTable({ results }: RaceResultsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Position</TableHead>
          <TableHead>Driver</TableHead>
          <TableHead>Constructor</TableHead>
          <TableHead>Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((result) => (
          <TableRow key={result.position}>
            <TableCell>{result.position}</TableCell>
            <TableCell>{result.Driver.givenName} {result.Driver.familyName}</TableCell>
            <TableCell>{result.Constructor.name}</TableCell>
            <TableCell>{result.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
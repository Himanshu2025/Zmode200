import { getRaces } from "./lib/api/jolpica";

export default async function Home() {
  const races = await getRaces(2025);

  return (
    <main>
      <h1>ZMode200 — 2025 Season</h1>
      <ul>
        {races.map((race) => (
          <li key={race.round}>
            {race.raceName} — {race.date} — {race.Circuit.circuitName}
          </li>
        ))}
      </ul>
    </main>
  );
}

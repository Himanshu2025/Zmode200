"use client";

import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { secondsToTime } from "@/lib/transformlaps";
import { DRIVER_COLOURS } from "@/lib/drivercolours";
import type { DriverLap } from "@/app/types/f1";

interface LapChartProps {
  laps: DriverLap[];
}

export default function LapChart({ laps }: LapChartProps) {
  const drivers = useMemo(
    () => [...new Set(laps.map((l) => l.driver).filter(Boolean))] as string[],
    [laps]
  );

  const [active, setActive] = useState<Set<string>>(new Set(drivers));

  const toggle = (driver: string) =>
    setActive((prev) => {
        const next = new Set(prev); 
        if (next.has(driver)){
            next.delete(driver); 
        } else {
            next.add(driver); 
        }
        return next; 
    })

  const data = useMemo(() => {
    const byLap: Record<number, Record<string, number>> = {};
    laps.forEach(({ lap, driver, time }) => {
      if (!byLap[lap]) byLap[lap] = { lap };
      byLap[lap][driver] = time;
    });
    return Object.values(byLap).sort((a, b) => a.lap - b.lap);
  }, [laps]);

  return (
    <div>
      {/* Driver toggles */}
      <div className="flex flex-wrap gap-2 mb-4">
        {drivers.map((d) => (
          <button
            key={d}
            onClick={() => toggle(d)}
            className="px-2 py-1 rounded text-xs font-medium border transition-opacity"
            style={{
              borderColor: DRIVER_COLOURS[d] ?? "#888",
              color: active.has(d) ? "#fff" : "#555",
              backgroundColor: active.has(d)
                ? (DRIVER_COLOURS[d] ?? "#888")
                : "transparent",
            }}
          >
            {d.split("_").pop()?.replace(/^\w/, (c) => c.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis
            dataKey="lap"
            label={{ value: "Lap", position: "insideBottom", offset: -4 }}
          />
          <YAxis reversed tickFormatter={secondsToTime} width={70} />
          <Tooltip formatter={(v: number | undefined) => secondsToTime(v)} />
          {drivers
            .filter((d) => active.has(d))
            .map((d) => (
              <Line
                key={d}
                type="monotone"
                dataKey={d}
                dot={false}
                strokeWidth={2}
                stroke={DRIVER_COLOURS[d] ?? "#888"}
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
    
  );
  
}

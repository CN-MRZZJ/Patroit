"use client";

import { useEffect, useState } from "react";

const KEYS = {
  operatorName: "operatorName",
  eventId: "eventId",
  athleteType: "athleteType",
} as const;

export function getOperatorName(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(KEYS.operatorName) ?? "";
}

export function saveOperatorName(name: string): void {
  localStorage.setItem(KEYS.operatorName, name);
}

export function getEventId(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(KEYS.eventId) ?? "0", 10);
}

export function saveEventId(id: string): void {
  localStorage.setItem(KEYS.eventId, id);
}

export function getAthleteType(): string {
  if (typeof window === "undefined") return "competitive";
  return localStorage.getItem(KEYS.athleteType) ?? "competitive";
}

export function saveAthleteType(type: string): void {
  localStorage.setItem(KEYS.athleteType, type);
}

interface Props {
  orgName: string;
}

export default function Watermark({ orgName }: Props) {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(getOperatorName());
  }, []);

  const text = [orgName, name].filter(Boolean).join(" — ");

  if (!text) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none"
      aria-hidden
    >
      <div className="grid grid-cols-3 grid-rows-5 h-full w-full gap-6 p-6 opacity-[0.06]">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="flex items-center justify-center text-2xl font-bold text-gray-900 whitespace-nowrap -rotate-15"
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import ScoreEntryForm from "@/components/ScoreEntryForm";
import EntryList from "@/components/EntryList";
import SummaryBar from "@/components/SummaryBar";
import {
  saveOperatorName,
  saveEventId,
  saveAthleteType,
} from "@/components/Watermark";
import { fetchResults, createResult } from "@/lib/api";
import type { Result } from "@/lib/types";

export default function Home() {
  const [entries, setEntries] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const init = params.get("init");
    const eventId = params.get("event_id");
    const athleteType = params.get("athlete_type");

    let changed = false;

    if (init) {
      saveOperatorName(init);
      params.delete("init");
      changed = true;
    }
    if (eventId) {
      saveEventId(eventId);
      params.delete("event_id");
      changed = true;
    }
    if (athleteType) {
      saveAthleteType(athleteType);
      params.delete("athlete_type");
      changed = true;
    }

    if (changed) {
      const url = new URL(window.location.href);
      url.search = params.toString();
      window.history.replaceState({}, "", url);
    }
  }, []);

  const loadEntries = useCallback(async () => {
    try {
      const json = await fetchResults();
      if (json.ok) {
        setEntries(json.items);
      }
    } catch {
      // silent fail on load
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  async function handleSubmit(athleteNumber: string, score: string) {
    setError(null);
    try {
      const json = await createResult(athleteNumber, score);
      if (!json.ok) {
        setError(json.error ?? "录入失败");
        return;
      }
      await loadEntries();
    } catch {
      setError("网络错误，请重试");
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 pt-4 pb-20 space-y-4">
      <header className="text-center py-3">
        <h1 className="text-xl font-bold text-gray-900">成绩录入</h1>
      </header>

      <ScoreEntryForm onSubmit={handleSubmit} />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 underline"
          >
            关闭
          </button>
        </div>
      )}

      {loaded && <EntryList entries={entries} />}

      <SummaryBar count={entries.length} />
    </div>
  );
}

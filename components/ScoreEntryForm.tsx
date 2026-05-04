"use client";

import { useRef, useState, type FormEvent } from "react";

interface Props {
  onSubmit: (athleteNumber: string, score: number) => Promise<void>;
  disabled?: boolean;
}

export default function ScoreEntryForm({ onSubmit, disabled }: Props) {
  const [athleteNumber, setAthleteNumber] = useState("");
  const [score, setScore] = useState("");
  const [loading, setLoading] = useState(false);
  const athleteRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading || disabled) return;

    setLoading(true);
    try {
      await onSubmit(athleteNumber.trim(), parseFloat(score) || 0);
      setAthleteNumber("");
      setScore("");
      athleteRef.current?.focus();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-3"
    >
      <div className="space-y-1">
        <label
          htmlFor="athleteNumber"
          className="block text-sm font-medium text-gray-600"
        >
          运动员编号
        </label>
        <input
          ref={athleteRef}
          id="athleteNumber"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          autoFocus
          value={athleteNumber}
          onChange={(e) => setAthleteNumber(e.target.value)}
          placeholder="输入编号"
          disabled={disabled}
          className="w-full h-12 px-4 text-base rounded-lg border border-gray-200
                     focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                     placeholder:text-gray-300 disabled:bg-gray-100"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="score" className="block text-sm font-medium text-gray-600">
          成绩
        </label>
        <input
          id="score"
          type="number"
          inputMode="decimal"
          autoComplete="off"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          placeholder="0.0"
          disabled={disabled}
          step="any"
          className="w-full h-12 px-4 text-base rounded-lg border border-gray-200
                     focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                     placeholder:text-gray-300 disabled:bg-gray-100"
        />
      </div>

      <button
        type="submit"
        disabled={loading || disabled}
        className="w-full h-12 rounded-lg font-semibold text-white text-base
                   bg-primary active:bg-primary-dark
                   disabled:bg-gray-300 disabled:text-gray-400
                   transition-colors duration-150"
      >
        {loading ? "提交中..." : "确认录入"}
      </button>
    </form>
  );
}

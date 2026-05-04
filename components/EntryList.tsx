"use client";

import type { Result } from "@/lib/types";

interface Props {
  entries: Result[];
}

export default function EntryList({ entries }: Props) {
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <svg
          className="w-12 h-12 mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-sm">暂无录入记录</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-100 border border-gray-100 rounded-xl bg-white overflow-hidden">
      {entries.map((entry, index) => (
        <li
          key={entry.id}
          className="flex items-center gap-3 px-4 py-3 animate-fade-in"
          style={{ animationDelay: `${index * 30}ms` }}
        >
          <span className="text-xs font-mono text-gray-400 w-6 shrink-0">
            {entries.length - index}
          </span>

          <div className="flex-1 min-w-0">
            <span className="text-base font-medium text-gray-900">
              {entry.target_name}
            </span>
            {entry.created_at && (
              <span className="ml-2 text-sm text-gray-500">
                {new Date(entry.created_at).toLocaleTimeString("zh-CN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
            )}
          </div>

          <span className="text-lg font-bold text-primary tabular-nums">
            {entry.performance}
          </span>
        </li>
      ))}
    </ul>
  );
}

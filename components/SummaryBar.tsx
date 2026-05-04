"use client";

interface Props {
  count: number;
}

export default function SummaryBar({ count }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-gray-200 px-4 py-3 safe-area-bottom">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        <span className="text-sm text-gray-500">
          已录入
          <span className="ml-1 text-lg font-bold text-gray-900 tabular-nums">
            {count}
          </span>
          <span className="ml-1">条</span>
        </span>
      </div>
    </div>
  );
}

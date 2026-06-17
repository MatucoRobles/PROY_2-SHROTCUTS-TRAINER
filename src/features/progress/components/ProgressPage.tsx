import { ArrowLeft, Trophy, Clock, Flame } from "lucide-react";
import { useNavigate } from "react-router";
import { useProgressStore } from "../progressStore";
import { useShortcutStore } from "../../training/useShortcutStore";
import { getGlobalStats, formatResponseTime, isMastered } from "../utils";
import { getAccuracy } from "../../training/utils";
import { cn } from "@/shared/utils/cn";
import { GlobalAccuracyRing } from "./GlobalAccuracyRing";

const TOOL_COLORS: Record<string, string> = {
  General: "text-sky-400",
  "VS Code": "text-violet-400",
  Chrome: "text-emerald-400",
  Windows: "text-yellow-400",
};

const TOOL_ACCENT: Record<string, string> = {
  General: "bg-sky-400",
  "VS Code": "bg-violet-400",
  Chrome: "bg-emerald-400",
  Windows: "bg-yellow-400",
};

export function ProgressPage() {
  const navigate = useNavigate();
  const records = useProgressStore((s) => s.records);
  const shortcuts = useShortcutStore((s) => s.shortcuts);

  const { globalAccuracy, totalMastered, totalShortcuts } = getGlobalStats(
    records,
    shortcuts.length,
  );

  const toolRows = Object.values(records);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col gap-8">
      {/* Header */}
      <header className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="hidden sm:flex items-center gap-1.5 text-slate-400 hover:text-slate-100 text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Atrás
        </button>
        <Trophy className="w-5 h-5 text-yellow-400" aria-hidden />
        <h1 className="text-lg font-semibold">Tu Progreso</h1>
      </header>

      {/* Layout principal */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        {/* Tabla de récords por herramienta */}
        <section className="lg:w-2/3 bg-slate-900/70 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-800">
            <p className="text-[10px] uppercase tracking-widest text-slate-500">
              Récords por herramienta
            </p>
          </div>

          {toolRows.length === 0 ? (
            <p className="px-5 py-8 text-slate-500 text-sm text-center">
              Completá al menos una sesión para ver tus récords.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-slate-800">
                  <th className="text-left px-4 py-2">Herramienta</th>
                  <th className="text-left px-3 py-2">Mejor T.</th>
                  <th className="text-left px-3 py-2">Racha</th>
                  <th className="text-left px-3 py-2 hidden sm:table-cell">
                    Precisión
                  </th>
                </tr>
              </thead>
              <tbody>
                {toolRows.map((record) => {
                  const accuracy = getAccuracy(
                    record.totalCorrect,
                    record.totalWrong,
                  );
                  return (
                    <tr
                      key={record.tool}
                      className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors"
                    >
                      <td
                        className={cn(
                          "px-4 py-4 font-medium",
                          TOOL_COLORS[record.tool] ?? "text-slate-300",
                        )}
                      >
                        {record.tool}
                      </td>
                      <td className="px-3 py-4 text-slate-400 tabular-nums">
                        <span className="flex items-center gap-1.5">
                          <Clock
                            className="w-3.5 h-3.5 text-sky-500"
                            aria-hidden
                          />
                          {formatResponseTime(record.bestAvgResponseTime)}
                        </span>
                      </td>
                      <td className="px-3 py-4 tabular-nums">
                        <span className="flex items-center gap-1.5 text-orange-400">
                          <Flame className="w-3.5 h-3.5" aria-hidden />
                          {record.bestStreakever}
                        </span>
                      </td>
                      {/* Oculta en mobile, visible desde sm */}
                      <td className="px-3 py-4 w-36 hidden sm:table-cell">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              role="progressbar"
                              aria-valuenow={accuracy}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              className={cn(
                                "h-full rounded-full transition-all duration-500",
                                TOOL_ACCENT[record.tool] ?? "bg-slate-400",
                              )}
                              style={{ width: `${accuracy}%` }}
                            />
                          </div>
                          <span className="text-slate-400 tabular-nums text-xs w-8 text-right">
                            {accuracy}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>

        {/* Círculo global */}
        <section className="lg:w-1/3 bg-slate-900/70 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-3 py-8">
          <p className="text-[10px] uppercase tracking-widest text-slate-500">
            Precisión global
          </p>
          <GlobalAccuracyRing value={globalAccuracy} />
        </section>
      </div>

      {/* Atajos dominados */}
      <section className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <p className="text-[10px] uppercase tracking-widest text-slate-500">
            Atajos dominados
          </p>
          <span className="text-sm text-emerald-400 font-semibold tabular-nums">
            {totalMastered} / {totalShortcuts}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {shortcuts.map((shortcut) => {
            const mastered = isMastered(shortcut.id, records);
            return (
              <span
                key={shortcut.id}
                title={shortcut.description}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-colors",
                  mastered
                    ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                    : "bg-slate-800/60 border-slate-700/50 text-slate-600",
                )}
              >
                {shortcut.expectedCombo
                  .map((k) => (k === "Control" ? "Ctrl" : k))
                  .join("+")}
              </span>
            );
          })}
        </div>
      </section>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex sm:hidden items-center gap-1.5 text-slate-400 hover:text-slate-100 text-lg m-auto transition-colors self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        Atrás
      </button>
    </main>
  );
}


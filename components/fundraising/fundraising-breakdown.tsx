"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useLanguage } from "@/components/providers/language-provider";

type Entry = {
  id: number;
  label: string;
  labelWel: string | null;
  type: string;
  year: number;
  amount: number; // pence
};

type Props = {
  entries: Entry[];
};

type ChartRow = { label: string; amount: number };

function formatGBP(pence: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(pence / 100);
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000] px-3 py-2 text-xs font-black uppercase tracking-wide">
      {formatGBP(payload[0].value)}
    </div>
  );
}

function HorizontalChart({
  data,
  color,
  totalLabel,
}: {
  data: ChartRow[];
  color: string;
  totalLabel: string;
}) {
  const total = data.reduce((s, r) => s + r.amount, 0);
  const chartHeight = Math.max(120, data.length * 52 + 40);

  return (
    <div className="flex flex-col h-full">
      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
          barSize={22}
        >
          <XAxis
            type="number"
            tickFormatter={(v) => formatGBP(v)}
            tick={{ fontSize: 10, fontWeight: 700 }}
            axisLine={{ stroke: "#000" }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="label"
            width={140}
            tick={{ fontSize: 11, fontWeight: 700, fill: "#111" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f3f4f6" }} />
          <Bar dataKey="amount" fill={color} radius={0} stroke="#000" strokeWidth={1.5} />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-2 px-2 flex items-center justify-between border-t-2 border-black pt-2">
        <span className="text-[10px] font-black uppercase tracking-wide text-gray-500">{totalLabel}</span>
        <span className="text-sm font-black" style={{ color }}>{formatGBP(total)}</span>
      </div>
    </div>
  );
}

export default function FundraisingBreakdown({ entries }: Props) {
  const { language } = useLanguage();
  const years = [...new Set(entries.map((e) => e.year))].sort();
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");

  const getLabel = (e: Entry) =>
    language === "cy" && e.labelWel ? e.labelWel : e.label;

  const filtered =
    selectedYear === "all" ? entries : entries.filter((e) => e.year === selectedYear);

  // Aggregate by label and sort highest first
  const aggregate = (type: "income" | "expenditure"): ChartRow[] => {
    const map = new Map<string, number>();
    filtered
      .filter((e) => e.type === type)
      .forEach((e) => {
        const key = getLabel(e);
        map.set(key, (map.get(key) ?? 0) + e.amount);
      });
    return [...map.entries()]
      .map(([label, amount]) => ({ label, amount }))
      .sort((a, b) => b.amount - a.amount);
  };

  const incomeData = aggregate("income");
  const expenditureData = aggregate("expenditure");

  const hasData = incomeData.length > 0 || expenditureData.length > 0;

  return (
    <section className="space-y-6">
      {/* Section heading */}
      <div className="border-b-2 border-black pb-4">
        <span className="inline-block border-2 border-black bg-purple-600 text-white text-xs font-black uppercase tracking-widest px-3 py-1 shadow-[3px_3px_0px_0px_#000]">
          {language === "cy" ? "Dadansoddiad Ariannol" : "Financial Breakdown"}
        </span>
        <h2 className="mt-3 text-3xl font-black text-black">
          {language === "cy" ? "Incwm a Gwariant — 3 Blynedd Diwethaf" : "Income & Expenditure — Last 3 Years"}
        </h2>
        <p className="text-sm text-gray-700 mt-1 border-l-4 border-purple-500 pl-3">
          {language === "cy"
            ? "Cymhariaeth o arian a godwyd ac a wariwyd."
            : "A comparison of money raised and money spent."}
        </p>
      </div>

      {/* Year filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedYear("all")}
          className={`text-xs font-black uppercase tracking-wide px-4 py-2 border-2 border-black transition-all ${
            selectedYear === "all"
              ? "bg-purple-700 text-white shadow-[3px_3px_0px_0px_#000]"
              : "bg-white text-black hover:bg-purple-50 shadow-[2px_2px_0px_0px_#000]"
          }`}
        >
          {language === "cy" ? "Pob Blwyddyn" : "All Years"}
        </button>
        {years.map((y) => (
          <button
            key={y}
            onClick={() => setSelectedYear(y)}
            className={`text-xs font-black uppercase tracking-wide px-4 py-2 border-2 border-black transition-all ${
              selectedYear === y
                ? "bg-purple-700 text-white shadow-[3px_3px_0px_0px_#000]"
                : "bg-white text-black hover:bg-purple-50 shadow-[2px_2px_0px_0px_#000]"
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      {/* Back-to-back horizontal bar charts */}
      {hasData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 border-2 border-black bg-white shadow-[6px_6px_0px_0px_#000] overflow-hidden">
          {/* Income — left */}
          <div className="p-5 md:border-r-2 md:border-black border-b-2 md:border-b-0 border-black">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block w-3 h-3 border-2 border-black" style={{ background: "#7c3aed" }} />
              <p className="text-xs font-black uppercase tracking-widest text-purple-700">
                {language === "cy" ? "Incwm (Codwyd)" : "Income (Raised)"}
              </p>
            </div>
            {incomeData.length > 0 ? (
              <HorizontalChart
                data={incomeData}
                color="#7c3aed"
                totalLabel={language === "cy" ? "Cyfanswm Incwm" : "Total Income"}
              />
            ) : (
              <p className="text-xs text-gray-400 font-black uppercase py-8 text-center">
                {language === "cy" ? "Dim data" : "No data"}
              </p>
            )}
          </div>

          {/* Expenditure — right */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block w-3 h-3 border-2 border-black" style={{ background: "#ca8a04" }} />
              <p className="text-xs font-black uppercase tracking-widest text-yellow-700">
                {language === "cy" ? "Gwariant (Gwariannwyd)" : "Expenditure (Spent)"}
              </p>
            </div>
            {expenditureData.length > 0 ? (
              <HorizontalChart
                data={expenditureData}
                color="#ca8a04"
                totalLabel={language === "cy" ? "Cyfanswm Gwariant" : "Total Expenditure"}
              />
            ) : (
              <p className="text-xs text-gray-400 font-black uppercase py-8 text-center">
                {language === "cy" ? "Dim data" : "No data"}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="border-2 border-black bg-white p-12 text-center shadow-[4px_4px_0px_0px_#000]">
          <p className="text-sm font-black text-gray-400 uppercase">
            {language === "cy" ? "Dim data ar gael" : "No data available"}
          </p>
        </div>
      )}
    </section>
  );
}

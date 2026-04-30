"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useLanguage } from "@/components/providers/language-provider";

type Entry = {
  id: number;
  label: string;
  type: string;
  year: number;
  amount: number; // pence
};

type Props = {
  entries: Entry[];
};

function formatGBP(pence: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(pence / 100);
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000] p-3 text-xs font-black uppercase">
      <p className="mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.name === "Income" || p.name === "Incwm" ? "#7c3aed" : "#ca8a04" }}>
          {p.name}: {formatGBP(p.value)}
        </p>
      ))}
    </div>
  );
}

export default function FundraisingBreakdown({ entries }: Props) {
  const { language } = useLanguage();
  const years = [...new Set(entries.map((e) => e.year))].sort();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const incomeLabel = language === "cy" ? "Incwm" : "Income";
  const expenditureLabel = language === "cy" ? "Gwariant" : "Expenditure";

  // Build chart data — one row per year
  const chartData = years.map((year) => {
    const yearEntries = entries.filter((e) => e.year === year);
    const income = yearEntries.filter((e) => e.type === "income").reduce((s, e) => s + e.amount, 0);
    const expenditure = yearEntries.filter((e) => e.type === "expenditure").reduce((s, e) => s + e.amount, 0);
    return { year: String(year), [incomeLabel]: income, [expenditureLabel]: expenditure };
  });

  // Entries for the detail table
  const tableEntries = selectedYear
    ? entries.filter((e) => e.year === selectedYear)
    : entries;

  const tableByYear = selectedYear ? [selectedYear] : years;

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
            ? "Cymhariaeth o arian a godwyd ac a wariwyd ym mhob blwyddyn."
            : "A comparison of money raised and spent each year."}
        </p>
      </div>

      {/* Chart */}
      <div className="border-2 border-black bg-white shadow-[6px_6px_0px_0px_#000] p-6">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} margin={{ top: 4, right: 8, left: 16, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase" }}
              axisLine={{ stroke: "#000" }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => formatGBP(v)}
              tick={{ fontSize: 11, fontWeight: 700 }}
              axisLine={{ stroke: "#000" }}
              tickLine={false}
              width={72}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f3f4f6" }} />
            <Legend
              wrapperStyle={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", paddingTop: 12 }}
            />
            <Bar dataKey={incomeLabel} fill="#7c3aed" stroke="#000" strokeWidth={2} radius={0} />
            <Bar dataKey={expenditureLabel} fill="#ca8a04" stroke="#000" strokeWidth={2} radius={0} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Year filter tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedYear(null)}
          className={`text-xs font-black uppercase tracking-wide px-4 py-2 border-2 border-black transition-all ${
            selectedYear === null
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

      {/* Breakdown table */}
      <div className="border-2 border-black bg-white shadow-[6px_6px_0px_0px_#000] overflow-hidden">
        <div className="bg-purple-700 border-b-2 border-black px-5 py-3">
          <p className="text-white font-black text-xs uppercase tracking-wide">
            {language === "cy" ? "Manylion" : "Entry Detail"}
          </p>
        </div>

        {tableByYear.map((year) => {
          const yearEntries = tableEntries.filter((e) => e.year === year);
          const income = yearEntries.filter((e) => e.type === "income");
          const expenditure = yearEntries.filter((e) => e.type === "expenditure");
          const totalIncome = income.reduce((s, e) => s + e.amount, 0);
          const totalExpenditure = expenditure.reduce((s, e) => s + e.amount, 0);

          return (
            <div key={year} className="border-b-2 border-black last:border-b-0">
              <div className="bg-purple-50 border-b-2 border-black px-5 py-2">
                <p className="font-black text-sm uppercase tracking-wide">{year}</p>
              </div>

              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left font-black uppercase tracking-wide px-5 py-2 text-gray-500">
                      {language === "cy" ? "Eitem" : "Item"}
                    </th>
                    <th className="text-left font-black uppercase tracking-wide px-5 py-2 text-gray-500">
                      {language === "cy" ? "Math" : "Type"}
                    </th>
                    <th className="text-right font-black uppercase tracking-wide px-5 py-2 text-gray-500">
                      {language === "cy" ? "Swm" : "Amount"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {income.map((e) => (
                    <tr key={e.id} className="border-b border-gray-100">
                      <td className="px-5 py-2 font-semibold">{e.label}</td>
                      <td className="px-5 py-2">
                        <span className="inline-block bg-purple-100 text-purple-800 border border-purple-300 px-2 py-0.5 text-[10px] font-black uppercase">
                          {language === "cy" ? "Incwm" : "Income"}
                        </span>
                      </td>
                      <td className="px-5 py-2 text-right font-black text-purple-700">{formatGBP(e.amount)}</td>
                    </tr>
                  ))}
                  {expenditure.map((e) => (
                    <tr key={e.id} className="border-b border-gray-100">
                      <td className="px-5 py-2 font-semibold">{e.label}</td>
                      <td className="px-5 py-2">
                        <span className="inline-block bg-yellow-100 text-yellow-800 border border-yellow-300 px-2 py-0.5 text-[10px] font-black uppercase">
                          {language === "cy" ? "Gwariant" : "Expenditure"}
                        </span>
                      </td>
                      <td className="px-5 py-2 text-right font-black text-yellow-700">{formatGBP(e.amount)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 border-t-2 border-black">
                    <td colSpan={2} className="px-5 py-2 font-black uppercase text-xs tracking-wide">
                      {language === "cy" ? "Cyfanswm" : "Total"}
                    </td>
                    <td className="px-5 py-2 text-right">
                      <span className="font-black text-purple-700">{formatGBP(totalIncome)}</span>
                      <span className="text-gray-400 mx-1">/</span>
                      <span className="font-black text-yellow-700">{formatGBP(totalExpenditure)}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </section>
  );
}

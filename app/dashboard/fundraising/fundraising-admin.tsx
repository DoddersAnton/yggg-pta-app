"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X } from "lucide-react";

import { FundraisingSchema, zFundraisingSchema } from "@/types/fundraising-schema";
import { createFundraising } from "@/server/actions/create-fundraising";
import { deleteFundraising } from "@/server/actions/delete-fundraising";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Entry = {
  id: number;
  label: string;
  type: string;
  year: number;
  amount: number; // pence
};

const fieldLabel = "text-xs font-black uppercase tracking-wide text-black";
const fieldInput =
  "rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-purple-600 shadow-[2px_2px_0px_0px_#000]";

function formatGBP(pence: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 2,
  }).format(pence / 100);
}

const currentYear = new Date().getFullYear();

export default function FundraisingAdmin({ entries: initialEntries }: { entries: Entry[] }) {
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const years = [...new Set(entries.map((e) => e.year))].sort((a, b) => b - a);
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");

  const form = useForm<zFundraisingSchema>({
    resolver: zodResolver(FundraisingSchema),
    defaultValues: { label: "", type: "income", year: currentYear, amount: 0 },
    mode: "onChange",
  });

  const { execute: executeSave, status: saveStatus } = useAction(createFundraising, {
    onSuccess: (data) => {
      toast.dismiss();
      if (data.data?.error) { toast.error(data.data.error); return; }
      if (data.data?.success) {
        toast.success(data.data.success);
        resetForm();
        // Reload entries from server by triggering a page refresh via router is overkill;
        // we'll optimistically update or let the user see the toast and navigate.
        window.location.reload();
      }
    },
    onExecute: () => toast.loading("Saving…"),
  });

  const { execute: executeDelete } = useAction(deleteFundraising, {
    onSuccess: (data) => {
      toast.dismiss();
      if (data.data?.error) { toast.error(data.data.error); return; }
      if (data.data?.success) {
        toast.success(data.data.success);
        setEntries((prev) => prev.filter((e) => e.id !== deleteTarget));
        setDeleteTarget(null);
      }
    },
    onExecute: () => toast.loading("Deleting…"),
  });

  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  function openAdd() {
    form.reset({ label: "", type: "income", year: currentYear, amount: 0 });
    setEditingId(null);
    setShowForm(true);
  }

  function openEdit(entry: Entry) {
    form.reset({
      id: entry.id,
      label: entry.label,
      type: entry.type as "income" | "expenditure",
      year: entry.year,
      amount: entry.amount / 100, // convert pence → pounds for the form
    });
    setEditingId(entry.id);
    setShowForm(true);
  }

  function resetForm() {
    form.reset({ label: "", type: "income", year: currentYear, amount: 0 });
    setEditingId(null);
    setShowForm(false);
  }

  function onDelete(id: number) {
    setDeleteTarget(id);
    executeDelete({ id });
  }

  function onSubmit(values: zFundraisingSchema) {
    executeSave(values);
  }

  const filteredEntries =
    selectedYear === "all" ? entries : entries.filter((e) => e.year === selectedYear);

  const displayYears =
    selectedYear === "all"
      ? years
      : years.filter((y) => y === selectedYear);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <span className="inline-block border-2 border-black bg-yellow-300 text-black text-xs font-black uppercase tracking-widest px-3 py-1 shadow-[3px_3px_0px_0px_#000] mb-3">
            Admin
          </span>
          <h1 className="text-3xl font-black text-black">Fundraising Data</h1>
          <p className="text-sm text-gray-600 mt-1">
            Add, edit, and delete income and expenditure entries for the last 3 years.
          </p>
        </div>
        {!showForm && (
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 bg-purple-700 text-white font-black text-xs uppercase tracking-wide px-5 py-2.5 border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
          >
            <Plus size={14} /> Add Entry
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="border-2 border-black bg-white shadow-[6px_6px_0px_0px_#000]">
          <div className="bg-purple-700 border-b-2 border-black px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="font-black text-white text-base uppercase tracking-wide">
                {editingId ? "Edit Entry" : "Add Entry"}
              </h2>
              <p className="text-purple-200 text-xs mt-0.5">
                {editingId ? "Update this fundraising entry." : "Enter the details for a new fundraising entry."}
              </p>
            </div>
            <button onClick={resetForm} className="text-purple-200 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Label */}
                <div className="sm:col-span-2">
                  <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={fieldLabel}>Event / Item Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Summer Disco, Reading Books"
                            className={fieldInput}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Type */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={fieldLabel}>Type</FormLabel>
                      <FormControl>
                        <select
                          className="w-full h-10 px-3 rounded-none border-2 border-black bg-white text-sm font-semibold shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:border-purple-600"
                          {...field}
                        >
                          <option value="income">Income (Raised)</option>
                          <option value="expenditure">Expenditure (Spent)</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Year */}
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={fieldLabel}>Year</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={String(currentYear)}
                          className={fieldInput}
                          min={2020}
                          max={2035}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Amount */}
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={fieldLabel}>Amount (£)</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-0">
                          <span className="flex items-center justify-center h-10 w-10 border-2 border-r-0 border-black bg-purple-50 shrink-0 text-purple-700 font-black text-sm">
                            £
                          </span>
                          <Input
                            type="number"
                            placeholder="0.00"
                            step="0.01"
                            min={0}
                            className="rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-purple-600 shadow-[2px_2px_0px_0px_#000]"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between items-center border-t-2 border-black px-6 py-4 bg-purple-50">
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-block bg-white text-black font-black text-xs uppercase tracking-wide px-5 py-2.5 border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveStatus === "executing"}
                  className="inline-block bg-purple-700 text-white font-black text-xs uppercase tracking-wide px-6 py-2.5 border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-[3px_3px_0px_0px_#000]"
                >
                  {saveStatus === "executing" ? "Saving…" : editingId ? "Save Changes" : "Add Entry"}
                </button>
              </div>
            </form>
          </Form>
        </div>
      )}

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
          All Years
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

      {/* Entries table */}
      {entries.length === 0 ? (
        <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000] p-12 text-center">
          <p className="font-black text-gray-400 uppercase tracking-wide text-sm">No entries yet.</p>
          <p className="text-xs text-gray-400 mt-1">Click Add Entry to get started.</p>
        </div>
      ) : (
        <div className="border-2 border-black bg-white shadow-[6px_6px_0px_0px_#000] overflow-hidden">
          {displayYears.map((year) => {
            const yearEntries = filteredEntries.filter((e) => e.year === year);
            if (!yearEntries.length) return null;
            const totalIncome = yearEntries.filter((e) => e.type === "income").reduce((s, e) => s + e.amount, 0);
            const totalExpend = yearEntries.filter((e) => e.type === "expenditure").reduce((s, e) => s + e.amount, 0);

            return (
              <div key={year} className="border-b-2 border-black last:border-b-0">
                <div className="bg-purple-50 border-b-2 border-black px-5 py-2 flex items-center justify-between">
                  <p className="font-black text-sm uppercase tracking-wide">{year}</p>
                  <p className="text-xs text-gray-500 font-semibold">
                    In: <span className="text-purple-700 font-black">{formatGBP(totalIncome)}</span>
                    {"  "}
                    Out: <span className="text-yellow-700 font-black">{formatGBP(totalExpend)}</span>
                  </p>
                </div>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left font-black uppercase tracking-wide px-5 py-2 text-gray-500">Item</th>
                      <th className="text-left font-black uppercase tracking-wide px-5 py-2 text-gray-500">Type</th>
                      <th className="text-right font-black uppercase tracking-wide px-5 py-2 text-gray-500">Amount</th>
                      <th className="px-5 py-2 text-gray-500" />
                    </tr>
                  </thead>
                  <tbody>
                    {yearEntries.map((entry) => (
                      <tr key={entry.id} className="border-b border-gray-100 last:border-b-0">
                        <td className="px-5 py-2.5 font-semibold">{entry.label}</td>
                        <td className="px-5 py-2.5">
                          {entry.type === "income" ? (
                            <span className="inline-block bg-purple-100 text-purple-800 border border-purple-300 px-2 py-0.5 text-[10px] font-black uppercase">
                              Income
                            </span>
                          ) : (
                            <span className="inline-block bg-yellow-100 text-yellow-800 border border-yellow-300 px-2 py-0.5 text-[10px] font-black uppercase">
                              Expenditure
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-2.5 text-right font-black">
                          <span className={entry.type === "income" ? "text-purple-700" : "text-yellow-700"}>
                            {formatGBP(entry.amount)}
                          </span>
                        </td>
                        <td className="px-5 py-2.5">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEdit(entry)}
                              className="p-1.5 border-2 border-black bg-white hover:bg-purple-50 shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                              title="Edit"
                            >
                              <Pencil size={12} />
                            </button>
                            <button
                              onClick={() => onDelete(entry.id)}
                              className="p-1.5 border-2 border-black bg-white hover:bg-red-50 shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all text-red-600"
                              title="Delete"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

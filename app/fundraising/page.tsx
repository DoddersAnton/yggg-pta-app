import { getFundraising } from "@/server/actions/get-fundraising";
import FundraisingPriorities from "@/components/fundraising/fundraising-priorities";
import FundraisingBreakdown from "@/components/fundraising/fundraising-breakdown";

export default async function FundraisingPage() {
  const result = await getFundraising();
  const entries = result.success ?? [];

  return (
    <main className="bg-purple-50 min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <FundraisingPriorities />
        {entries.length > 0 && <FundraisingBreakdown entries={entries} />}
      </div>
    </main>
  );
}

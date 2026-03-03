import { RFPEditor } from "@/features/rfp-generation";
import { FileText } from "lucide-react";

interface RFPTabProps { selectedPlatforms: string[]; }

export function RFPTab({ selectedPlatforms }: RFPTabProps) {
  return (
    <div className="space-y-8 max-w-7xl mx-auto" data-testid="page-rfp">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10"><FileText className="w-6 h-6 text-primary" /></div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">RFP Generator</h1>
          <p className="text-muted-foreground mt-1">Create and manage Requests for Proposal for your AI platform evaluation.</p>
        </div>
      </div>
      <RFPEditor selectedPlatforms={selectedPlatforms} />
    </div>
  );
}

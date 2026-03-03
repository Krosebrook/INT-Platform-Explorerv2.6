import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { SaveStackDialog, StackList } from "@/features/stack-management";
import type { Stack } from "@/entities/stack";
import { Plus } from "lucide-react";

interface StacksTabProps {
  selectedPlatforms: string[];
  onLoadStack: (stack: Stack) => void;
}

export function StacksTab({ selectedPlatforms, onLoadStack }: StacksTabProps) {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  return (
    <div className="space-y-8 max-w-7xl mx-auto" data-testid="page-stacks">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Saved Stacks</h1>
          <p className="text-muted-foreground mt-1">Manage your saved evaluations and platform combinations.</p>
        </div>
        <Button onClick={() => setSaveDialogOpen(true)} disabled={selectedPlatforms.length === 0} className="gap-2" data-testid="button-save-current-comparison">
          <Plus className="w-4 h-4" />Save Current Comparison
        </Button>
      </div>
      <StackList onLoad={onLoadStack} />
      <SaveStackDialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen} platformIds={selectedPlatforms} />
    </div>
  );
}

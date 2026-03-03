import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Label } from "@/shared/ui/label";
import { Badge } from "@/shared/ui/badge";
import { platforms } from "@/entities/platform/data";
import type { Stack } from "@/entities/stack";
import { useStacks, useSaveStack, useDeleteStack } from "@/entities/stack";
import { Layers, Trash2, ArrowRight, Calendar, Database, Plus } from "lucide-react";

interface SaveStackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platformIds: string[];
  onSaved?: () => void;
}

export function SaveStackDialog({ open, onOpenChange, platformIds, onSaved }: SaveStackDialogProps) {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const { saveStack } = useSaveStack(() => { onSaved?.(); });

  const handleSave = () => {
    if (!name.trim() || platformIds.length === 0) return;
    const now = new Date().toISOString();
    const newStack: Stack = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36),
      name: name.trim(), platformIds, notes, createdAt: now, updatedAt: now,
    };
    saveStack(newStack);
    onOpenChange(false);
    setName("");
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" data-testid="dialog-save-stack">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Layers className="w-5 h-5" />Save Evaluation Stack</DialogTitle>
          <DialogDescription>Save your current selection of {platformIds.length} platform{platformIds.length !== 1 ? "s" : ""} to access later.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="stack-name">Stack Name</Label>
            <Input id="stack-name" placeholder="e.g. Q1 GenAI Candidates" value={name} onChange={(e) => setName(e.target.value)} data-testid="input-stack-name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="stack-notes">Notes (optional)</Label>
            <Textarea id="stack-notes" placeholder="Context about this evaluation..." value={notes} onChange={(e) => setNotes(e.target.value)} data-testid="input-stack-notes" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={!name.trim() || platformIds.length === 0} data-testid="button-save-stack-confirm">Save Stack</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface StackListProps { onLoad: (stack: Stack) => void; }

export function StackList({ onLoad }: StackListProps) {
  const { stacks, refresh } = useStacks();
  const { deleteStack } = useDeleteStack(refresh);

  if (stacks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-xl bg-muted/30" data-testid="stack-list-empty">
        <div className="p-4 rounded-full bg-background shadow-sm mb-4"><Layers className="w-8 h-8 text-muted-foreground" /></div>
        <h3 className="text-lg font-semibold">No Saved Stacks</h3>
        <p className="text-sm text-muted-foreground max-w-sm mt-2">Start exploring platforms and save your comparisons to create your first stack.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="stack-list">
      {stacks.map((stack) => {
        const resolvedPlatforms = stack.platformIds.map((pid) => platforms.find((p) => p.id === pid)).filter(Boolean);
        return (
          <Card key={stack.id} className="group hover:shadow-md transition-shadow relative overflow-hidden" data-testid={`stack-card-${stack.id}`}>
            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                onClick={(e) => { e.stopPropagation(); deleteStack(stack.id); }} data-testid={`button-delete-stack-${stack.id}`}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{stack.name}</CardTitle>
              {stack.notes && <CardDescription className="line-clamp-2">{stack.notes}</CardDescription>}
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="font-normal text-xs flex items-center gap-1">
                  <Database className="w-3 h-3" />{stack.platformIds.length} Platform{stack.platformIds.length !== 1 ? "s" : ""}
                </Badge>
                <Badge variant="outline" className="font-normal text-xs flex items-center gap-1 text-muted-foreground">
                  <Calendar className="w-3 h-3" />{new Date(stack.createdAt).toLocaleDateString()}
                </Badge>
              </div>
              <div className="flex -space-x-2 overflow-hidden py-1">
                {resolvedPlatforms.slice(0, 5).map((p) => (
                  <div key={p!.id} className="inline-flex h-8 w-8 rounded-full ring-2 ring-background items-center justify-center text-xs font-bold text-white shadow-sm"
                    style={{ backgroundColor: p!.logoColor }} title={p!.name}>{p!.name.charAt(0)}</div>
                ))}
                {stack.platformIds.length > 5 && (
                  <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-background bg-muted text-[10px] font-medium text-muted-foreground">+{stack.platformIds.length - 5}</div>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t p-4 bg-muted/30">
              <Button className="w-full justify-between" onClick={() => onLoad(stack)} data-testid={`button-load-stack-${stack.id}`}>
                Load Evaluation<ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

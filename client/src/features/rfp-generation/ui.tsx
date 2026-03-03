import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Label } from "@/shared/ui/label";
import { Badge } from "@/shared/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { platforms } from "@/entities/platform/data";
import { FileText, Download, Plus, ChevronRight, Pencil } from "lucide-react";
import type { RFPSection } from "./model";
import { useRFPEditor } from "./model";

function exportPDF() { window.print(); }

interface NewRFPDialogProps { open: boolean; onOpenChange: (o: boolean) => void; onCreate: (t: string, v: string[]) => void; selectedPlatforms: string[]; }

function NewRFPDialog({ open, onOpenChange, onCreate, selectedPlatforms }: NewRFPDialogProps) {
  const [title, setTitle] = useState("Enterprise AI Platform Evaluation RFP");
  const handleCreate = () => { if (!title.trim()) return; onCreate(title.trim(), selectedPlatforms); onOpenChange(false); setTitle("Enterprise AI Platform Evaluation RFP"); };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]" data-testid="dialog-new-rfp">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><FileText className="w-5 h-5" />Create New RFP</DialogTitle>
          <DialogDescription>Generate a Request for Proposal based on your selected platforms.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="rfp-title">Document Title</Label>
            <Input id="rfp-title" value={title} onChange={(e) => setTitle(e.target.value)} data-testid="input-rfp-title" />
          </div>
          <div className="grid gap-2">
            <Label>Included Platforms ({selectedPlatforms.length})</Label>
            <div className="flex flex-wrap gap-1.5">
              {selectedPlatforms.map((pid) => { const p = platforms.find((pl) => pl.id === pid); return p ? <Badge key={pid} variant="secondary">{p.name}</Badge> : null; })}
              {selectedPlatforms.length === 0 && <p className="text-sm text-muted-foreground">No platforms selected. The RFP will use generic vendor placeholders.</p>}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleCreate} disabled={!title.trim()} data-testid="button-create-rfp">Create RFP</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SectionNav({ sections, activeSectionId, onSelect }: { sections: RFPSection[]; activeSectionId: string | undefined; onSelect: (s: RFPSection) => void; }) {
  return (
    <nav className="space-y-1" data-testid="rfp-section-nav">
      {sections.map((section) => {
        const isActive = section.id === activeSectionId;
        return (
          <button key={section.id} onClick={() => onSelect(section)} data-testid={`rfp-section-nav-${section.type}`}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}>
            {section.title}<ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        );
      })}
    </nav>
  );
}

interface RFPEditorProps { selectedPlatforms: string[]; }

export function RFPEditor({ selectedPlatforms }: RFPEditorProps) {
  const { document: rfpDoc, activeSection, setActiveSection, createDocument, updateSectionContent, updateTitle } = useRFPEditor();
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);

  if (!rfpDoc) {
    return (
      <>
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl bg-muted/30" data-testid="rfp-empty-state">
          <div className="p-4 rounded-full bg-background shadow-sm mb-4"><FileText className="w-10 h-10 text-muted-foreground" /></div>
          <h3 className="text-xl font-semibold mb-2">No RFP Drafted</h3>
          <p className="text-muted-foreground max-w-md mb-6">Create a structured Request for Proposal document based on your selected platforms and evaluation criteria.</p>
          <Button onClick={() => setNewDialogOpen(true)} className="gap-2" data-testid="button-draft-new-rfp"><Plus className="w-4 h-4" />Draft New RFP</Button>
        </div>
        <NewRFPDialog open={newDialogOpen} onOpenChange={setNewDialogOpen} onCreate={createDocument} selectedPlatforms={selectedPlatforms} />
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 min-h-[600px]" data-testid="rfp-editor">
      <aside className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              {editingTitle ? (
                <Input value={rfpDoc.title} onChange={(e) => updateTitle(e.target.value)} onBlur={() => setEditingTitle(false)}
                  onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)} autoFocus className="text-sm font-semibold" data-testid="input-rfp-title-inline" />
              ) : (
                <CardTitle className="text-base cursor-pointer flex items-center gap-1.5 group" onClick={() => setEditingTitle(true)}>
                  {rfpDoc.title}<Pencil className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                </CardTitle>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{rfpDoc.status.toUpperCase()} &middot; {new Date(rfpDoc.createdAt).toLocaleDateString()}</p>
          </CardHeader>
          <CardContent><SectionNav sections={rfpDoc.sections} activeSectionId={activeSection?.id} onSelect={setActiveSection} /></CardContent>
        </Card>
        <Button variant="outline" className="w-full gap-2" onClick={exportPDF} data-testid="button-export-pdf"><Download className="w-4 h-4" />Export PDF</Button>
      </aside>
      <Card className="overflow-hidden">
        {activeSection ? (
          <>
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="text-lg" data-testid="rfp-active-section-title">{activeSection.title}</CardTitle>
              <Badge variant="outline" className="w-fit text-xs">{activeSection.type}</Badge>
            </CardHeader>
            <CardContent className="p-6">
              <Textarea value={activeSection.content} onChange={(e) => updateSectionContent(activeSection.id, e.target.value)}
                className="min-h-[400px] resize-y font-mono text-sm leading-relaxed" placeholder="Start writing this section..." data-testid="textarea-rfp-section-content" />
            </CardContent>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground p-12">Select a section from the sidebar to begin editing.</div>
        )}
      </Card>
    </div>
  );
}

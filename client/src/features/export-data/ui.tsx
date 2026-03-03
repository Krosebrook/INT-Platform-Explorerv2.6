import { Download, FileSpreadsheet, FileJson } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { exportToCSV, exportToJSON } from "./model";
import type { Platform } from "@shared/schema";

interface ExportMenuProps { data: Platform[]; }

export function ExportMenu({ data }: ExportMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2" disabled={data.length === 0} data-testid="export-menu-trigger">
          <Download className="w-4 h-4" />Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Export {data.length} platforms</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => exportToCSV(data)} data-testid="export-csv"><FileSpreadsheet className="mr-2 h-4 w-4" />Download as CSV</DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportToJSON(data)} data-testid="export-json"><FileJson className="mr-2 h-4 w-4" />Download as JSON</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

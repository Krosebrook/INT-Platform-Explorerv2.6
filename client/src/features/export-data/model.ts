import type { Platform } from "@shared/schema";

export type ExportFormat = "csv" | "json";

export interface ExportOptions {
  filename?: string;
  includeMetadata?: boolean;
}

function triggerDownload(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function buildFilename(base: string, extension: ExportFormat): string {
  const timestamp = new Date().toISOString().split("T")[0];
  return `${base}-${timestamp}.${extension}`;
}

function escapeCSV(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function exportToCSV(data: Platform[], filename?: string): void {
  if (data.length === 0) return;
  const lines: string[] = [];
  lines.push(`# INT Platform Explorer - CSV Export`);
  lines.push(`# Date: ${new Date().toISOString()}`);
  lines.push(`# Records: ${data.length}`);
  lines.push("");
  lines.push(["Name","Category","Priority","Ecosystem","Pricing","Market Share","Context Window","Compliance","Target Users","Verdict"].map(escapeCSV).join(","));
  for (const p of data) {
    lines.push([p.name, p.category, p.priority, p.ecosystem ?? "N/A", p.pricing, p.marketShare, p.contextWindow, p.compliance.join("; "), p.targetUsers, p.verdict].map((v) => escapeCSV(String(v))).join(","));
  }
  triggerDownload(lines.join("\n"), buildFilename(filename ?? "ai-platforms-export", "csv"), "text/csv;charset=utf-8;");
}

export function exportToJSON(data: Platform[], filename?: string): void {
  if (data.length === 0) return;
  const payload = { metadata: { exportDate: new Date().toISOString(), source: "INT Platform Explorer", totalRecords: data.length }, platforms: data };
  triggerDownload(JSON.stringify(payload, null, 2), buildFilename(filename ?? "ai-platforms-export", "json"), "application/json");
}

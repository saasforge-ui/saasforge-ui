import { Download, FileJson, FileSpreadsheet, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface DataExportMenuProps {
  onExportCSV?: () => void;
  onExportJSON?: () => void;
  onExportExcel?: () => void;
  isExporting?: boolean;
}

export function DataExportMenu({ onExportCSV, onExportJSON, onExportExcel, isExporting = false }: DataExportMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={isExporting}>
          {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onExportCSV} disabled={!onExportCSV}>
          <FileText className="h-4 w-4" /> Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onExportJSON} disabled={!onExportJSON}>
          <FileJson className="h-4 w-4" /> Export as JSON
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onExportExcel} disabled={!onExportExcel}>
          <FileSpreadsheet className="h-4 w-4" /> Export as Excel{!onExportExcel && " (coming soon)"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

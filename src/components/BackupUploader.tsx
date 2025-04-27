"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Upload } from "lucide-react";

interface BackupUploaderProps {
  onBackupUpload: () => void;
}

export function BackupUploader({ onBackupUpload }: BackupUploaderProps) {
  return (
    <DropdownMenuItem
      onClick={onBackupUpload}
      className="cursor-pointer hover:bg-neutral-800"
    >
      <Upload size={16} />
      Import backup file
    </DropdownMenuItem>
  );
}

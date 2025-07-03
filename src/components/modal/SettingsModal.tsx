"use client";

import { useSettingsStore } from "@/store/useSettingsStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "@radix-ui/react-label";
import { ThemeToggle } from "../ThemeToggle";

const SettingsModal = () => {
  const { isOpen, onClose } = useSettingsStore();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Appearance</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize your Nekopad
            </span>
          </div>
          <ThemeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;

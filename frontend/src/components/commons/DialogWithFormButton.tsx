'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

interface DialogWithFormButtonProps {
  dialog: {
    title: string;
    description: string;
    form: (setShowDialog: (value: boolean) => void) => React.ReactNode;
  };
  name: string;
}

const DialogWithFormButton = ({ dialog, name }: DialogWithFormButtonProps) => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          {name}
          <PlusIcon className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{dialog.title}</DialogTitle>
          <DialogDescription>{dialog.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{dialog.form(setShowDialog)}</div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogWithFormButton;

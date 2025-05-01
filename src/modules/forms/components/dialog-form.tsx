"use client";
import { File } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function FormSubmissionDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleFormSubmission = async () => {
    try {
      setIsPending(true);
      // Simulate form submission delay
      await new Promise((res) => setTimeout(res, 1500));

      toast.success("Form submitted successfully!");
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-rose-600 hover:bg-rose-50"
        >
          <File className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>फारम Submission</DialogTitle>
          <DialogDescription>
            कृपया फारममा भरिएका fields हरु रजू गर्नुहोस
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            onClick={() => setOpen(false)}
            variant="ghost"
            className="px-4 bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleFormSubmission}
            variant="destructive"
            className="px-4 bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

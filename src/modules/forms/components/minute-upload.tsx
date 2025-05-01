import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFileDialog } from "@/hooks/use-file-dialog";
import { Upload } from "lucide-react";
import { useEffect } from "react";
export const MinuteUpload = () => {
  const { file, open, reset } = useFileDialog({
    accept: ".pdf",
    multiple: false,
    resetOnOpen: true,
  });

  useEffect(() => {
    return () => reset();
  }, [reset]);


  return (
    <Card className="shadow-lg p-6">
      <CardHeader>
        <CardTitle>Upload Minute </CardTitle>
      </CardHeader>
      <CardContent className="my-0">
        <div className="flex flex-col gap-6">
          <div
            className="hover:bg-accent/50 cursor-pointer rounded-lg border-2 border-dashed p-12 text-center transition-colors"
            onClick={open}
          >
            <Upload className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <p className="text-muted-foreground mb-4 text-sm">
              Click to browse files
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={e => {
                e.stopPropagation();
                open();
              }}
            >
              <Upload className="h-4 w-4" />
              Select File
            </Button>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium">File Requirements</h3>
            <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
              <li>Supported formats: PDF</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
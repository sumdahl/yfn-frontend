import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFileDialog } from "@/hooks/use-file-dialog";
import { Upload, File, Loader2, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/api/axios";
import { toast } from "sonner";
import { useIsAuthenticated } from "@/stores/auth-store";
import useSectorStore from "@/stores/sector-store";
import { FileUp } from "lucide-react";

export const MinuteUpload = () => {
  const isAuthenticated = useIsAuthenticated();

  const { sectorData, updateMinuteInfo } = useSectorStore();
  const minuteDetails = sectorData?.minute_details;

  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const { files, open, reset } = useFileDialog({
    accept: ".pdf",
    multiple: false,
    resetOnOpen: true,
  });

  const file = files?.[0];

  useEffect(() => {
    return () => reset();
  }, [reset]);

  // Defensive checks
  const allowed = minuteDetails?.is_minute_allowed ?? false;
  const alreadyUploaded = !!minuteDetails?.minute_info;

  if (!isAuthenticated || !allowed) return null;

  // Handle file upload
  const handleSubmit = async () => {
    if (!file) return;
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/minute", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(response.data?.message || "Minute uploaded successfully");

      updateMinuteInfo({ uploaded: true });

      // Optionally, set local state to reflect the uploaded status
      setUploaded(true);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Error uploading PDF.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="shadow-lg p-6 m-2">
      <CardHeader className="flex gap-2 items-center">
        <FileUp
          className="animate-pulse scale-175
        "
        />
        <CardTitle className="">Minute Upload गर्नुहोस्</CardTitle>
      </CardHeader>
      <CardContent className="my-0 relative">
        {alreadyUploaded || uploaded ? (
          <div className="flex flex-col items-center justify-center text-center gap-4 py-10">
            <CheckCircle className="text-green-600 w-16 h-16" />
            <h2 className="text-green-700 text-3xl font-semibold">
              Minute successfully अप्लोड भयो
            </h2>
            <p className="text-muted-foreground text-base">
              कृपया अब फारम भर्नुहोस्
            </p>
            {file && (
              <div className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                <File className="w-4 h-4 text-green-600" />
                <span>{file.name}</span>
              </div>
            )}
          </div>
        ) : (
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
                onClick={(e) => {
                  e.stopPropagation();
                  open();
                }}
              >
                <Upload className="h-4 w-4" />
                Select File
              </Button>
            </div>
            {file && (
              <div className="text-sm text-muted-foreground flex items-center justify-center">
                <span className="font-medium text-foreground flex items-center gap-2">
                  <File className="w-4 h-4" />
                  {file.name}
                </span>
              </div>
            )}
            <div>
              <h3 className="mb-2 text-sm font-medium">File Requirements</h3>
              <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                <li>Supported formats: PDF</li>
              </ul>
            </div>
          </div>
        )}

        {!uploaded && file && (
          <Button
            variant="outline"
            className="absolute bottom-4 right-4 bg-primary text-white"
            onClick={handleSubmit}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Uploading...
              </>
            ) : (
              "Upload a Minute"
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

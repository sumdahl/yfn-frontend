import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFileDialog } from "@/hooks/use-file-dialog";
import { Upload, File, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/api/axios";
import { toast } from "sonner";
import { useIsAuthenticated } from "@/stores/auth-store";

export const MinuteUpload = () => {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [alreadyUploaded, setAlreadyUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = useIsAuthenticated();

  const { files, open, reset } = useFileDialog({
    accept: ".pdf",
    multiple: false,
    resetOnOpen: true,
  });

  const file = files?.[0];

  useEffect(() => {
    return () => reset();
  }, [reset]);

  useEffect(() => {
    if (isAuthenticated) {
      getMinuteDetails();
    } else {
      setIsLoading(false);
      setAllowed(false);
    }
  }, [isAuthenticated]);

  const getMinuteDetails = async () => {
    try {
      const response = await api.get("/sector");
      const { minute_details } = response.data.data;

      console.log("API Response: ", minute_details);

      setAllowed(minute_details.is_minute_allowed);
      setAlreadyUploaded(!!minute_details.minute_info);
    } catch (error) {
      console.error("Error fetching minute details: ", error);
      toast.error("Error getting minute details.");
      setAllowed(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await api.post("/minute", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Upload Response:", response.data);
      toast.info("Minute status:", response.data.message);
      setAlreadyUploaded(true);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Error uploading PDF.");
    } finally {
      setIsUploading(false);
    }
  };

  console.log(
    "Rendering MinuteUpload, allowed:",
    allowed,
    "isLoading:",
    isLoading
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  if (!isAuthenticated || allowed || !allowed) return null;

  if (alreadyUploaded) {
    return (
      <p className="text-green-600 text-center font-medium text-3xl">
        Minute PDF already uploaded.
      </p>
    );
  }

  return (
    <Card className="shadow-lg p-6">
      <CardHeader>
        <CardTitle>Upload Minute</CardTitle>
      </CardHeader>
      <CardContent className="my-0 relative">
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
        {file && (
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

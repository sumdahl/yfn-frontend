import { api } from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFileDialog } from "@/hooks/use-file-dialog";
import { useIsAuthenticated } from "@/stores/auth-store";
import useSectorStore from "@/stores/sector-store";
import { File, FileUp, Loader2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import MinuteUploadSuccess from "./minute-success";

export const MinuteUpload = () => {
  const isAuthenticated = useIsAuthenticated();

  const sectorData = useSectorStore(s => s.sectorData);

  const updateMinuteInfo = useSectorStore(s => s.updateMinuteInfo);

  const minuteDetails = sectorData?.minute_details;
  console.log(minuteDetails);
  const allowed = minuteDetails?.is_minute_allowed ?? false;
  const minuteInfo = minuteDetails?.minute_info;
  console.log("Minute info:", minuteInfo);

  //State for managing the upload process
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const { files, open, reset } = useFileDialog({
    accept: ".pdf",
    multiple: false,
    resetOnOpen: true,
  });

  const file = files?.[0];
  console.log("Files:", file);

  // useEffect(() => {
  //   //fetch data
  // });

  useEffect(() => {
    //Clean up the component unmounts or reset the file dialog
    return () => reset();
  }, [reset]);

  const alreadyUploaded = !!minuteInfo;

  useEffect(() => {
    //Show a toast once the minute is allowed
    if (alreadyUploaded) {
      toast.info("तपाइंले minute अप्लोड गरिसक्नु भएको छ");
    }
  }, [alreadyUploaded]);

  //If the user is not authenticated or not allowed to upload a minute, return nothing.
  if (!isAuthenticated || !allowed) return null;

  // Handle file upload
  const handleSubmit = async () => {
    if (!file) return;
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/minute", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }); //multipar/form-data

      console.log("Response after uploading minute:", response);

      toast.success(response.data?.message || "Minute uploaded successfully");

      // console.log(response.data.data?.)
      const updatedMinuteInfo = response.data.data?.minute_details.minute_info;
      console.log(updatedMinuteInfo);
      console.log("Minute info :", minuteInfo);
      updateMinuteInfo(updatedMinuteInfo);

      setUploaded(true); //Mark the upload as successful
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Error uploading PDF.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="lg:max-w-4/5 xl:max-w-3/5 mx-auto">
      <Card className="shadow-lg p-4">
        <CardHeader className="flex gap-2 items-center">
          <FileUp
            className="animate-pulse scale-175
        "
          />
          <CardTitle className="">Minute Upload गर्नुहोस्</CardTitle>
        </CardHeader>
        <CardContent className="my-0 relative">
          {alreadyUploaded || uploaded ? (
            <MinuteUploadSuccess fileName={file?.name} /> // {file?.name || minuteInfo?.file_path}
          ) : (
            <div className="flex flex-col gap-6">
              <div
                aria-disabled={isUploading}
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
                  disabled={isUploading}
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
              type="submit"
              className="absolute bottom-4 right-4 bg-primary hover:bg-secondary text-white"
              onClick={handleSubmit}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Uploading..
                </>
              ) : (
                "Upload a Minute"
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

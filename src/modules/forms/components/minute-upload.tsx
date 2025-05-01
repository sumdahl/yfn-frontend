// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useFileDialog } from "@/hooks/use-file-dialog";
// import { Upload } from "lucide-react";
// import { useEffect, useState } from "react";
// import { File } from "lucide-react";
// export const MinuteUpload = () => {
//   const [allowed, setAllowed] = useState<boolean | null>(null);
//   const [alreadyUploaded, setAlreadyUploaded] = useState(false);
//   const { files, open, reset } = useFileDialog({
//     accept: ".pdf",
//     multiple: false,
//     resetOnOpen: true,
//   });

//   const file = files?.[0];

//   useEffect(() => {
//     return () => reset();
//   }, [reset]);

//   useEffect(() => {
//     const fetchMinuteStatus = async () => {
//       await new Promise((res) => setTimeout(res, 500));

//       const mockResponse = {
//         data: {
//           minute_details: {
//             is_minute_allowed: true,
//             minute_info: undefined,
//           },
//         },
//       };

//       const minuteDetails = mockResponse.data.minute_details;
//       setAllowed(minuteDetails.is_minute_allowed);
//       setAlreadyUploaded(!!minuteDetails.minute_info);
//     };

//     fetchMinuteStatus();
//   }, []);

//   if (allowed === null || !allowed) return null;

//   if (alreadyUploaded) {
//     return (
//       <p className="text-green-600 text-center font-medium">
//         Minute PDF already uploaded.
//       </p>
//     );
//   }

//   return (
//     <Card className="shadow-lg p-6">
//       <CardHeader>
//         <CardTitle>Upload Minute </CardTitle>
//       </CardHeader>
//       <CardContent className="my-0 relative">
//         <div className="flex flex-col gap-6">
//           <div
//             className="hover:bg-accent/50 cursor-pointer rounded-lg border-2 border-dashed p-12 text-center transition-colors"
//             onClick={open}
//           >
//             <Upload className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
//             <p className="text-muted-foreground mb-4 text-sm">
//               Click to browse files
//             </p>
//             <Button
//               type="button"
//               variant="outline"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 open();
//               }}
//             >
//               <Upload className="h-4 w-4" />
//               Select File
//             </Button>
//           </div>
//           {file && (
//             <div className="text-sm text-muted-foreground flex items-center justify-center">
//               <span className="font-medium text-foreground flex items-center gap-2">
//                 <File className="w-4 h-4" />
//                 {file.name}
//               </span>
//             </div>
//           )}
//           <div>
//             <h3 className="mb-2 text-sm font-medium">File Requirements</h3>
//             <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
//               <li>Supported formats: PDF</li>
//             </ul>
//           </div>
//         </div>
//         {file && (
//           <Button
//             variant="outline"
//             className="absolute bottom-4 right-4 bg-primary text-white"
//             onClick={() => console.log("Upload minute")}
//           >
//             Uplod Minute
//           </Button>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFileDialog } from "@/hooks/use-file-dialog";
import { Upload, File, CheckCircle, ArrowRightCircle } from "lucide-react";
import { useEffect, useState } from "react";

export const MinuteUpload = () => {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [alreadyUploaded, setAlreadyUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
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
    const fetchMinuteStatus = async () => {
      await new Promise((res) => setTimeout(res, 500)); // Simulate delay

      const mockResponse = {
        data: {
          minute_details: {
            is_minute_allowed: true,
            minute_info: undefined, // simulate not uploaded
          },
        },
      };

      const minuteDetails = mockResponse.data.minute_details;
      setAllowed(minuteDetails.is_minute_allowed);
      setAlreadyUploaded(!!minuteDetails.minute_info);
    };

    fetchMinuteStatus();
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);

    // Simulate upload
    await new Promise((res) => setTimeout(res, 1000));

    // After success
    setAlreadyUploaded(true);
    reset(); // clear file
    setIsUploading(false);
  };

  if (allowed === null || !allowed) return null;

  if (alreadyUploaded) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="flex items-center space-x-2 text-green-600">
          <CheckCircle className="w-6 h-6" />
          <h2 className="text-2xl font-semibold">
            हजुरको Minute सफलतापूर्वक अपलोड भयो
          </h2>
        </div>
        <div className="flex items-center space-x-2 text-gray-700">
          <ArrowRightCircle className="w-5 h-5" />
          <span className="text-base">कृपया अब फारम भर्नुहोस्</span>
        </div>
      </div>
    );
  }

  return (
    <Card className="shadow-lg p-6">
      <CardHeader>
        <CardTitle>Minute Upload गर्नुहोस् </CardTitle>
      </CardHeader>
      <CardContent className="my-0 relative">
        <div className="flex flex-col gap-6">
          <div
            className="hover:bg-accent/50 cursor-pointer rounded-lg border-2 border-dashed p-12 text-center transition-colors"
            onClick={open}
          >
            <Upload className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <p className="text-muted-foreground mb-4 text-sm">
              यहाँ क्लीक गरेर file छान्नुहोस्
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
              File Select गर्नुहोस्
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
            <h3 className="mb-2 text-sm font-medium">File Requirements: </h3>
            <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
              <li>Supported formats: PDF</li>
            </ul>
          </div>
        </div>

        {file && (
          <Button
            variant="outline"
            className="absolute bottom-4 right-4 bg-primary text-white"
            onClick={handleUpload}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Minute"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

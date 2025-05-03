// components/SuccessMessage.tsx
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function FormUploadSuccess() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg border-green-500 border-2">
        <CardContent className="flex flex-col items-center text-center gap-4 p-8">
          <CheckCircle className="text-green-600 w-16 h-16" />
          <h2 className="text-2xl font-semibold text-green-700">
            Form Uploaded Successfully!
          </h2>
          <p className="text-gray-600">
            Your form has been submitted and saved. You may now close this
            window or continue with other tasks.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

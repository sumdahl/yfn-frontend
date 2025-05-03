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
            फारम सफलतापूर्बक अप्लोड भयो
          </h2>
          <p className="text-gray-600">
            तपाईंको फारम पेश गरिएको छ र सुरक्षित गरिएको छ। अब तपाईं यो विन्डो
            बन्द गर्न सक्नुहुन्छ वा अन्य कार्यहरू जारी राख्न सक्नुहुन्छ।
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

//after user submit the form
//check response from backend
//if response has form data then
//show this form
//if user tries to access /forms -> redirect to /success
// and show this message

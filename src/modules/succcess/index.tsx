import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useState } from "react";

export default function FormSuccess() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-svh bg-gray-100 p-4">
      <Card className="w-full max-w-md overflow-hidden shadow-lg py-0 card-container">
        <div className="bg-gradient-to-r from-[#011031] to-[#01184d] text-white p-4 pb-6 relative">
          <div className="flex items-center gap-3 mt-2 pb-2">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-4 border-[#011031] border-t-transparent transform -rotate-45"></div>
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">राष्ट्रिय युवा संघ नेपाल</h1>
              <p className="text-xs opacity-90">१० औं राष्ट्रिय महाधिवेशन</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-4 bg-[#B71C1C]"></div>
        </div>

        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full border-4 border-[#B71C1C] overflow-hidden shadow-md">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src="/api/placeholder/112/112"
                  alt="User photo"
                  onLoad={() => setImageLoaded(true)}
                />
                <AvatarFallback className="bg-gray-200 text-2xl font-bold">
                  {imageLoaded ? "NT" : "..."}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#011031] ">नाम थर</h2>
            <Badge
              variant="outline"
              className="mt-1 border-[#011031] text-[#011031]"
            >
              केन्द्रीय समिति, सदस्य
            </Badge>
          </div>

          <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
            <CheckCircle className="h-8 w-8" />
            <span className="text-2xl font-bold">सफल!</span>
          </div>

          <Alert className="bg-green-50 border-green-200 mb-6">
            <AlertTitle className="text-lg font-medium text-green-800">
              तपाईको प्रतिनिधि फारम प्राप्त भयो
            </AlertTitle>
            <AlertDescription className="text-sm text-green-700">
              धन्यवाद! तपाईको विवरण सफलतापूर्वक दर्ता गरिएको छ।
            </AlertDescription>
          </Alert>

          <div className="text-sm text-gray-500">
            <p>फारम आईडी: NRS-2025-0145</p>
            <p className="mt-1">दर्ता मिति: २०८१/१२/२२</p>
          </div>
        </CardContent>

        <CardFooter className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">सम्पर्क गर्नुहोस्</p>
            <p className="text-sm font-medium text-[#011031]">०१-४५६७८९०</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";

export default function ProfileCard() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-svh bg-gray-100 p-4">
      <Card className="w-full max-w-[360px] aspect-[0.630517024] overflow-hidden rounded-lg shadow-lg border border-gray-200 flex flex-col py-0">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#011031] to-[#01184d] text-white p-4 pb-16 flex-shrink-0">
          <div className="flex items-center gap-3 mt-9">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-4 border-[#011031] border-t-transparent transform -rotate-45"></div>
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">राष्ट्रिय युवा संघ नेपाल</h1>
              <p className="text-xs opacity-90">१० औं राष्ट्रिय महाधिवेशन</p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-8 bg-[#B71C1C]"></div>
        </div>

        {/* Avatar */}
        <div className="flex justify-center -mt-18 z-10 relative flex-shrink-0">
          <div className="rounded-full border-4 border-[#B71C1C] overflow-hidden w-24 h-24 bg-gray-200 shadow-md">
            <Avatar className="w-full h-full">
              <AvatarImage
                src="/placeholder.svg?height=112&width=112"
                alt="Profile"
                onLoad={() => setImageLoaded(true)}
              />
              <AvatarFallback className="text-2xl font-bold">
                {imageLoaded ? "DP" : "..."}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Content */}
        <CardContent className="px-6 pb-1 flex-1 overflow-y-auto">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-[#011031]">नाम थर</h2>
            <div className="inline-block bg-[#B71C1C] text-white px-3 py-0.5 rounded-full text-sm font-medium mt-1">
              प्रतिनिधि कार्ड
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <span className="text-[#B71C1C] font-medium w-24">समिति</span>
              <span className="text-gray-600 flex-1">: केन्द्रीय समिति</span>
            </div>
            <div className="flex items-center">
              <span className="text-[#011031] font-medium w-24">पद</span>
              <span className="text-gray-600 flex-1">: सदस्य</span>
            </div>
            <div className="flex items-center">
              <span className="text-[#B71C1C] font-medium w-24">जन्म मिति</span>
              <span className="text-gray-600 flex-1">: २०५०/०५/१५</span>
            </div>
            <div className="flex items-center">
              <span className="text-[#B71C1C] font-medium w-24">फोन</span>
              <span className="text-gray-600 flex-1">: ९८०१२४८५१०</span>
            </div>
            <div className="flex items-center">
              <span className="text-[#011031] font-medium w-24">ठेगाना</span>
              <span className="text-gray-600 flex-1">: काठमाडौं, नेपाल</span>
            </div>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="px-6 py-2 bg-gray-50 border-t border-gray-200 flex-shrink-0">
          <div className="w-full text-center">
            <p className="font-medium text-sm text-[#011031]">मितिज थबे</p>
            <p className="text-xs text-gray-600">संयोजक मूल व्यवस्थापन समिति</p>
            <div className="border-t border-dashed border-gray-400 w-28 mx-auto mt-2 pt-1">
              <p className="text-[10px] text-gray-500">हस्ताक्षर</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function MinuteSuccess() {
  return (
    <div className="flex flex-col gap-6 px-4 lg:px-8">
      <Card className="shadow-md border-green-500 border-2 p-6">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <CheckCircle className="text-green-600 w-16 h-16" />
          <h2 className="text-green-700 text-3xl font-semibold">
            Minute successfully अप्लोड भयो
          </h2>
          <h3 className="text-muted-foreground text-2xl">
            कृपया अब फारम भर्नुहोस्
          </h3>
        </div>
      </Card>
    </div>
  );
}

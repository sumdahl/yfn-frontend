import useSectorStore from "@/stores/sector-store";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import Forms from "./common-form";
import MinuteUploadSuccess from "./components/minute-success";
import { MinuteUpload } from "./components/minute-upload";
export default function FormPage() {
  console.log("Component mounted main page formpage");
  const minuteDetails = useSectorStore(s => s.sectorData?.minute_details);
  const minuteAllowed = minuteDetails?.is_minute_allowed ?? false;
  const minuteInfo = minuteDetails?.minute_info;

  console.log("minute info", minuteInfo);
  console.log("minute allowed: ", minuteAllowed); //working
  // console.log("minute info", minuteDetails?.minute_info);
  // const minuteAllowed = minuteDetails?.is_minute_allowed ?? false;
  // const minuteInfo = minuteDetails?.minute_info;

  console.log(minuteDetails);

  useEffect(() => {
    if (minuteAllowed && minuteInfo !== null) {
      toast.info("तपाइंले minute अप्लोड गरिसक्नु भएको छ");
    }
  }, [minuteAllowed, minuteInfo]);

  const Comp = useMemo(() => {
    if (!minuteInfo)
      return (
        <div className="pt-8">
          <MinuteUpload />
        </div>
      );
    return (
      <div className="space-y-0 pt-8">
        <MinuteUploadSuccess />;
        <Forms />
      </div>
    );
  }, [minuteInfo]);

  return <>{Comp}</>;
}

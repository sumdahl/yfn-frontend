import { MinuteUpload } from "./components/minute-upload";
import Forms from "./common-form";
import { useEffect } from "react";
import { toast } from "sonner";
import useSectorStore from "@/stores/sector-store";

export default function FormPage() {
  const sectorData = useSectorStore((s) => s.sectorData);
  const minuteDetails = sectorData?.minute_details;
  const minuteAllowed = minuteDetails?.is_minute_allowed ?? false;
  const minuteInfo = minuteDetails?.minute_info;

  // Show MinuteUpload if it's allowed and no minute has been uploaded yet
  const shouldShowMinuteUpload = minuteAllowed && !minuteInfo;

  useEffect(() => {
    if (minuteAllowed && minuteInfo !== null) {
      toast.info("तपाइंले minute अप्लोड गरिसक्नु भएको छ");
    }
  }, [minuteAllowed, minuteInfo]);

  return <div>{shouldShowMinuteUpload ? <MinuteUpload /> : <Forms />}</div>;
}

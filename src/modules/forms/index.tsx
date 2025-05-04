import { MinuteUpload } from "./components/minute-upload";
import Forms from "./common-form";
import { useEffect } from "react";
import { toast } from "sonner";
import useSectorStore from "@/stores/sector-store";
import MinuteUploadSuccess from "./components/minute-success";
export default function FormPage() {
  console.log("Component mounted main page formpage");
  const minuteDetails = useSectorStore((s) => s.sectorData?.minute_details);
  const minuteAllowed = minuteDetails?.is_minute_allowed ?? false;
  const minuteInfo = minuteDetails?.minute_info;

  console.log("minute info", minuteInfo);
  console.log("minute allowed: ", minuteAllowed); //working
  // console.log("minute info", minuteDetails?.minute_info);
  // const minuteAllowed = minuteDetails?.is_minute_allowed ?? false;
  // const minuteInfo = minuteDetails?.minute_info;

  console.log(minuteDetails);
  // const shouldShowMinuteUpload = false;

  // Show MinuteUpload if it's allowed and no minute has been uploaded yet
  const shouldShowMinuteUpload = minuteAllowed && !minuteInfo;

  useEffect(() => {
    if (minuteAllowed && minuteInfo !== null) {
      toast.info("तपाइंले minute अप्लोड गरिसक्नु भएको छ");
    }
  }, [minuteAllowed, minuteInfo]);

  return (
    <div>
      {minuteAllowed ? (
        minuteInfo ? (
          <>
            <MinuteUploadSuccess />
            <Forms />
          </>
        ) : (
          <MinuteUpload />
        )
      ) : (
        <Forms />
      )}
    </div>
  );
}

// return <div>{shouldShowMinuteUpload ? <MinuteUpload /> : <Forms />}</div>;

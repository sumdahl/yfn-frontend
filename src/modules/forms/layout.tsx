import { api } from "@/api/axios";
import { SectorApiResponse } from "@/constants/api-sector";
import useSectorStore from "@/stores/sector-store";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function FormLayout() {
  const setSectorData = useSectorStore((e) => e.setSectorData);
  const setLoading = useSectorStore((e) => e.setLoading);
  const loading = useSectorStore((e) => e.isLoading);

  const fetchSectorInformation = useCallback(async () => {
    try {
      setLoading(true);
      const sectorRes = await api.get<SectorApiResponse>("/sector");
      const sectorData = sectorRes.data;
      if (!sectorData?.success || !sectorData?.data) {
        throw new Error("Failed to fetch sector data.");
      }

      if (
        !sectorData.data.minute_details ||
        !sectorData.data.sector_list ||
        !Array.isArray(sectorData.data.sector_list)
      ) {
        throw new Error("Invalid sector data structure");
      }

      setSectorData(sectorData.data);

      console.log("Sector response set. Navigating...");
    } finally {
      setLoading(false);
    }
  }, [setLoading, setSectorData]);

  useEffect(() => {
    fetchSectorInformation();
  }, [fetchSectorInformation]);

  if (loading)
    return (
      <div className="flex justify-center h-svh items-center">
        <Loader2 className="animate-spin size-10" />
      </div>
    );
  return <Outlet />;
}

// components/SectorComponent.tsx
import useSectorStore from "@/stores/sector-store";
import { Loader2 } from "lucide-react";

const SectorComponent = () => {
  const { sectorData, sectorMemberList, isLoading } = useSectorStore();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!sectorData) {
    return <div className="p-4">No sector data available.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Minute Details</h2>
      <pre className="bg-gray-100 p-2 rounded">
        {JSON.stringify(sectorData.minute_details, null, 2)}
      </pre>
      <h2 className="text-xl font-bold mt-4">Sector List</h2>
      <pre className="bg-gray-100 p-2 rounded">
        {JSON.stringify(sectorData.sector_list, null, 2)}
      </pre>
      <h2 className="text-xl font-bold mt-4">Sector Member List (Flattened)</h2>
      <pre className="bg-gray-100 p-2 rounded">
        {JSON.stringify(sectorMemberList, null, 2)}
      </pre>
    </div>
  );
};

export default SectorComponent;

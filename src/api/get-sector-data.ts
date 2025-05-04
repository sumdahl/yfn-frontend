import IResponse from "@/constants/sectorSchema";

import { api } from "./axios";
export const getSectorData = async () => {
  const data: IResponse = await api.get("/sector");
  return data;
};

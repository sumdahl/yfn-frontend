// types/sector.ts

export interface SectorData {
  minute_details: {
    is_minute_allowed: boolean;
    minute_info: unknown;
  };
  sector_list: {
    sector_details: {
      name: string;
      name_en: string;
      level: string;
    };
    sector_member_list: {
      id: number;
      role: string;
      position: string;
      name: string;
      name_en: string;
      username: string;
      phone: string;
      dob: string;
      photo: string;
      citizenship_no: string;
      citizenship_front: string;
      citizenship_back: string;
      geography_details?: unknown; // Optional, as it's null in the provided response
    }[];
  }[];
}

export interface SectorApiResponse {
  success: boolean;
  type: string;
  message: string;
  data: SectorData;
}

//response data after uploading minute
// minute_details: {
//   is_minute_allowed: boolean;
//   minute_details: {
//     "minute_info" : {
//       "id" : 1,
//       "file" : ""
//     }
//   }
// };

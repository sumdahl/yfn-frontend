export interface ApiSectorResponse {
  success: boolean;
  type: string;
  message: string;
  data: {
    minute_details: {
      is_minute_allowed: boolean;
      minute_info: null | unknown; // Adjust based on possible minute_info structure if known
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
        dob: string | null;
        photo: string | null;
        citizenship_no: string | null;
        citizenship_front: string | null;
        citizenship_back: string | null;
      }[];
    }[];
  };
}

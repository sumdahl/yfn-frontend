export interface ApiSectorResponse {
  minute_details: {
    is_minute_allowed: boolean;
    minute_info: unknown; //tell to change to boolean
  };
  sector_list: {
    sector_details: {
      name?: string;
      name_en?: string;
      level?: string;
    };
    sector_member_list: {
      id?: number;
      role?: string;
      position?: string;
      name?: string;
      name_en?: string;
      username?: string;
      phone?: string;
      dob?: string;
      photo?: string;
      citizenship_no?: string;
      citizenship_front?: string;
      citizenship_back?: string;
    }[];
  }[];
}

//राष्ट्रिय युवा संघ नेपाल
// dynamic heading change

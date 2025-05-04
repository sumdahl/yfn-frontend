// GET api/sector/

import { ROLE } from "@/models/user-roles";

export default interface IResponse {
  success: boolean;
  types: "success" | "failure";
  message: string;
  data: {
    minute_details: {
      is_minute_allowed: boolean;
      minute_info?: { id: number; file_path: string };
    };
    sector_list: ISectorLst[];
  };
}

interface ISectorLst {
  sector_details: { name: string; name_en: string; level: string };
  sector_member_list: ISectorMember[];
}

export interface ISectorMember {
  id: number;
  name: string | null;
  name_en: string | null;
  username: string | null;
  role: ROLE | null;
  is_approved?: boolean;
  position: string;
  phone: string | null;
  dob: string | null;
  photo: string | null;
  citizenship_no: string | null;
  citizenship_front: string | null;
  citizenship_back: string | null;
  geography_details: IGeographyDetails | null;
}

interface IGeographyDetails {
  province_details: { id: number; name: string; name_en: string } | null;
  district_details: { id: number; name: string; name_en: string } | null;
  local_details: { id: number; name: string; name_en: string } | null;
}

// this is same for both central committee (CTC) and central commission (CMC)
// just sector_details and sector_member_list is different
// but sector_member_list contains always 1 item
// and
// sector_list can contain only 1 item because there is only one sector
// - "केन्द्रीय कमिटी" if it is CTC
// - "केन्द्रीय आयोग" if it is CCM
// const centralCommittee_or_centralCommission: IResponse = {
//   success: true,
//   types: "success",
//   message: "....",
//   data: {
//     minute_details: {
//       is_minute_allowed: false, // user is not allowed to upload minute
//       minute_info: undefined, //   no need to check coz is_minute_allowed: false
//     },
//     sector_list: [
//       {
//         sector_details: {
//           name: "केन्द्रीय कमिटी",
//           name_en: "central committee",
//           level: "केन्द्रीय कमिटी",
//         },
//         sector_member_list: [
//           {
//             id: 1,
//             name: null,
//             name_en: null,
//             username: null,
//             role: ,
//             position: "अध्यक्ष",
//             phone: null,
//             dob: null,
//             photo: null,
//             citizenship_no: null,
//             citizenship_front: null,
//             citizenship_back: null,
//             geography_details: null,
//           },
//         ],
//       },
//     ],
//   },
// };

// // this is same for
// //  - department (DPC)
// //  - province (PVC)
// //  - metropolitan city (MPC)
// //  - sub-metropolitan city (SMC)
// //  - inter-district (ITD)
// // just sector_details and sector_member_list is different
// // but sector_member_list contains always 1 item
// // and
// // sector_list can contain
// //  - 3 items if sector belongs to department
// //  - 5 items if sector belongs to province
// //  - 2 items if sector belongs to metropolitan city
// //  - 1 items if sector belongs to sub-metropolitan city
// //  - 1 items if sector belongs to inter-district
// const department: IResponse = {
//   success: false,
//   types: "success",
//   message: "...",
//   data: {
//     minute_details: {
//       is_minute_allowed: true,
//       minute_info: undefined, // not uploaded, show minute section because is_minute_allowed: true
//     },
//     sector_list: [
//       {
//         sector_details: {
//           name: "खेलकुद",
//           name_en: "Sports",
//           level: "विभाग समिति",
//         },
//         sector_member_list: [
//           {
//             id: 2,
//             name: "np nm",
//             name_en: "en nm",
//             username: "null",
//             role: undefined,
//             position: "position-x",
//             phone: "123",
//             dob: "2001-01-01",
//             photo: "path",
//             citizenship_no: "12-12-67",
//             citizenship_front: "path",
//             citizenship_back: "path",
//             geography_details: null,
//           },
//           {
//             id: 4,
//             name: null,
//             name_en: null,
//             username: null,
//             role: undefined,
//             position: "position-y",
//             phone: null,
//             dob: null,
//             photo: null,
//             citizenship_no: null,
//             citizenship_front: null,
//             citizenship_back: null,
//             geography_details: null,
//           },
//           {
//             id: 5,
//             name: null,
//             name_en: null,
//             username: null,
//             role: undefined,
//             position: "position-z",
//             phone: null,
//             dob: null,
//             photo: null,
//             citizenship_no: null,
//             citizenship_front: null,
//             citizenship_back: null,
//             geography_details: null,
//           },
//         ],
//       },
//     ],
//   },
// };

// const district: IResponse = {
//   success: false,
//   types: "success",
//   message: "...",
//   data: {
//     minute_details: {
//       is_minute_allowed: true,
//       minute_info: { id: 10, file_path: "pth" },
//     },
//     sector_list: [
//       {
//         sector_details: { name: "झापा", name_en: "Jhapa", level: "जिल्ला" },
//         sector_member_list: [
//           /**
//            * 4 items because if Jhapa is १ देखि ४ सम्म निर्वाचन भएका जिल्ला
//            * 5 items because if Jhapa is ५  देखि माथि  निर्वाचन क्षेत्र
//            */
//         ],
//       },
//       {
//         sector_details: { name: "झापा", name_en: "Jhapa", level: "स्थानीय तह" },
//         sector_member_list: [
//           {
//             id: 100,
//             name: null,
//             name_en: null,
//             username: null,
//             role: undefined,
//             position: "position-abc",
//             phone: null,
//             dob: null,
//             photo: null,
//             citizenship_no: null,
//             citizenship_front: null,
//             citizenship_back: null,
//             geography_details: {
//               province_details: null,
//               district_details: null,
//               local_details: {
//                 id: 1,
//                 name: "दमक नगरपालिका",
//                 name_en: "Damak Municipality",
//               },
//             },
//             // similar 14 items because Jhapa contains 15 local level and the count is different for different district
//           },
//         ],
//       },
//     ],
//   },
// };

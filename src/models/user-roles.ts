export type UserRole =
  | "CTC"
  | "CCM"
  | "DPC"
  | "PVC"
  | "DE4"
  | "DE5"
  | "LCL"
  | "MPM"
  | "SMC"
  | "ITD";

// enum | form filled by | representative | form section | allowedMemNo |
// CTC  | individual     | 329            | 1            | 329          | केन्द्रीय कमिटी
// CCM  | individual     | 155            | 1            | 155          | केन्द्रीय आयोग
// DPC  | representative | 35             | 3            | 105          | (विभाग समिति)
// PVC  | representative | 8              | 5            | 40           | प्रदेश
// DE4  | representative | 72             | 4            | 288          | १ देखि ४ सम्म निर्वाचन भएका जिल्ला
// DE5  | representative | 5              | 5            | 25           | ५  देखि माथि  निर्वाचन क्षेत्र
// LCL  | representative | 753            | 1            | 753          | स्थानीय तह
// MPM  | representative | 6              | 2            | 12           | महानगरपालिका
// SMC  | representative | 11             | 1            | 11           | उपनगरपालिका
// ITD  | representative | 74             | 1            | 74           | अन्तर जिल्ला
// here section are used to fill candidate information

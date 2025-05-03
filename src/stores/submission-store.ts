// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// type SubmissionStore = {
//   hasSubmitted: boolean;
//   setHasSubmitted: (value: boolean) => void;
// };

// export const useSubmissionStore = create<SubmissionStore>()(
//   persist(
//     (set) => ({
//       hasSubmitted: false,
//       setHasSubmitted: (value) => set({ hasSubmitted: value }),
//     }),
//     {
//       name: "submission-store",
//       storage: {
//         getItem: (key) => sessionStorage.getItem(key),
//         setItem: (key, value) => sessionStorage.setItem(key, value),
//         removeItem: (key) => sessionStorage.removeItem(key),
//       },
//     }
//   )
// );

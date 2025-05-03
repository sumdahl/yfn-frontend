import { LOGO_FLAG } from "@/constants/logo";

export default function FormHeader() {
  return (
    <>
      <div className="flex justify-between">
        <span className="mr-2 text-xs md:text-sm  text-red-500">
          * <span className="text-gray-500/80">[Required]</span>
        </span>
        <div className="self-start text-xs md:text-sm ml-2 flex opacity-80 flex-col space-y-1">
          <span className="text-red-500">
            नोट : फारम भर्दा यी कुराहरु ध्यान दिनु होला{" "}
          </span>
          <div className="text-gray-600 md:text-sm text-xs">
            <p>१. सबै विवरण नागरिकता अनुसार भर्नुहोला </p>
            <p>
              २.
              <span className="ml-1 text-red-500">* </span>
              [Required] विवरण अनिवार्य भर्नुहोला
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-2 justify-center items-center py-4 rounded-lg">
        <img
          src={LOGO_FLAG}
          className="w-20 h-20 object-cover rounded-lg"
          alt="logo-flag"
        />
        <h1 className=" text-2xl md:text-4xl text-primary font-semibold">
          राष्ट्रिय युवा संघ नेपाल
        </h1>{" "}
        <h2 className="md:text-xl text-primary/90">
          १० औं राष्ट्रिय महाधिवेशन फारम
        </h2>{" "}
      </div>
    </>
  );
}

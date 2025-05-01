import { FileText } from "lucide-react";

export default function Header() {
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <FileText className="w-10 h-10 text-primary" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
        Official Government Form Submission {/*dummy  */}
      </h1>
    </div>
  );
}

//api/sector -> sector_list aauxa tesma details hunxa tei ansar le dekhaune

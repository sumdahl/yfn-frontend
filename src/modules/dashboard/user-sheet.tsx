import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar } from "@radix-ui/react-avatar";
import {
  AtSign,
  Calendar,
  Check,
  FileText,
  Info,
  MapPin,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { useSelectedUserStore } from "./store/use-selected-user";
import { formatDate, getInitials } from "./utils";

export const UserSheet = () => {
  const user = useSelectedUserStore(e => e.user);
  const setUser = useSelectedUserStore(e => e.setUser);
  return (
    <Sheet open={!!user} onOpenChange={e => setUser(e ? user : undefined)}>
      <SheetContent className="w-full max-w-5xl overflow-y-auto sm:max-w-3xl md:max-w-4xl lg:max-w-6xl px-8 pt-10">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5 text-primary" />
            User Details
          </SheetTitle>
          <SheetDescription>
            Complete information for user ID:{" "}
            <span className="font-medium">{user?.id}</span>
          </SheetDescription>
        </SheetHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
          <div className="space-y-6">
            <div className="flex flex-col items-center mb-6">
              <Avatar className="h-28 w-28 mb-3 ring-2 ring-primary/20 ring-offset-2">
                <AvatarImage src={user?.photo || ""} alt={user?.name ?? ""} />
                <AvatarFallback className="text-3xl bg-primary/10">
                  {getInitials(user?.name_en ?? "")}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-medium mt-2">{user?.name}</h2>
              <p className="text-muted-foreground">{user?.username}</p>
            </div>

            <Section
              title="Basic Information"
              items={[
                { icon: <Info />, label: "ID", value: user?.id },
                { icon: <User />, label: "Name", value: user?.name },
                { icon: <AtSign />, label: "Username", value: user?.username },
                {
                  icon: <Phone />,
                  label: "Phone",
                  value: user?.phone || "Not provided",
                },
                {
                  icon: <Calendar />,
                  label: "Date of Birth",
                  value: user?.dob ? formatDate(user?.dob) : "Not provided",
                },
              ]}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Section
              title="Role & Status"
              items={[
                {
                  icon: <Shield />,
                  label: "Role",
                  value: user?.role ? (
                    <Badge variant="outline" className="capitalize mt-1">
                      {user?.role}
                    </Badge>
                  ) : (
                    "Not assigned"
                  ),
                },
                {
                  icon: <Check />,
                  label: "Approval Status",
                  value: (
                    <Badge
                      variant={user?.is_approved ? "default" : "secondary"}
                      className={
                        user?.is_approved
                          ? "bg-green-100 text-green-800 hover:bg-green-100 mt-1"
                          : "mt-1 text-white"
                      }
                    >
                      {user?.is_approved ? "Approved" : "Pending"}
                    </Badge>
                  ),
                },
                {
                  icon: <FileText />,
                  label: "Position",
                  value: user?.position || "Not specified",
                },
              ]}
            />

            <Section
              title="Citizenship Information"
              items={[
                {
                  icon: <FileText />,
                  label: "Citizenship Number",
                  value: user?.citizenship_no || "Not provided",
                },
                {
                  icon: <FileText />,
                  label: "Citizenship Documents",
                  value:
                    user?.citizenship_front || user?.citizenship_back
                      ? "Documents uploaded"
                      : "No documents uploaded",
                },
              ]}
            />

            <Section
              title="Additional Information"
              items={[
                {
                  icon: <FileText />,
                  label: "English Name",
                  value: user?.name_en || "Not provided",
                },
                {
                  icon: <MapPin />,
                  label: "Geography Details",
                  value: "Not provided",
                },
              ]}
            />
          </div>
        </div>

        <div className="flex justify-end mt-8  items-center gap-2">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
          {!user?.is_approved && (
            <Button>
              <Check className="h-4 w-4" />
              Approve User
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
function Section({
  title,
  items,
}: {
  title: string;
  items: { icon: React.ReactNode; label: string; value: React.ReactNode }[];
}) {
  return (
    <div className="space-y-3 bg-slate-50 p-4 rounded-lg border">
      <h3 className="font-semibold text-base border-b pb-2">{title}</h3>
      <div className="grid grid-cols-1 gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="h-5 w-5 mt-0.5 text-primary shrink-0">
              {item.icon}
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{item.label}</p>
              <div className="text-sm mt-1">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

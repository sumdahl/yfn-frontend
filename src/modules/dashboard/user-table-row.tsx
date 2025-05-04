import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { ISectorMember } from "@/constants/sectorSchema";
import { Check } from "lucide-react";
import { useSelectedUserStore } from "./store/use-selected-user";
import { formatDate, getInitials } from "./utils";

export const UserTableRow = ({ user }: { user: ISectorMember }) => {
  const setSelectedUser = useSelectedUserStore(e => e.setUser);
  const  setApprovalUser= useSelectedUserStore(e => e.setApprovalUser);
  return (
    <TableRow
      className="cursor-pointer hover:bg-muted/50"
      onClick={() => setSelectedUser(user)}
    >
      <TableCell className="font-medium">{user.id}</TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.phone || "Not provided"}</TableCell>
      <TableCell>
        {user.role ? (
          <Badge variant="outline" className="capitalize">
            {user.role}
          </Badge>
        ) : (
          "Not assigned"
        )}
      </TableCell>
      <TableCell>{formatDate(user.dob)}</TableCell>
      <TableCell>
        <Avatar>
          <AvatarImage src={user.photo || ""} alt={user.name ?? ""} />
          <AvatarFallback>{getInitials(user.name ?? "")}</AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell>
        <Badge
          variant={user.is_approved ? "default" : "secondary"}
          className={
            user.is_approved
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : "text-white"
          }
        >
          {user.is_approved ? "Approved" : "Pending"}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        {!user.is_approved && (
          <Button variant="default" size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setApprovalUser(user);
            }}
          >
            <Check className="mr-1 h-4 w-4" />
            Approve
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

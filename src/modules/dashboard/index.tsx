import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Users } from "lucide-react";
import { AdminSidebar } from "./admin-sidebar";
import { ApproveUserDialog } from "./approve-alert-dialog";
import { UserSheet } from "./user-sheet";
import { UsersTable } from "./users-table";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="bg-background">
        <div className="flex flex-col p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight flex items-center">
              <Users className="mr-2 h-6 w-6" />
              User Management
            </h1>
          </div>
          <UsersTable />
          <UserSheet />
          <ApproveUserDialog />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

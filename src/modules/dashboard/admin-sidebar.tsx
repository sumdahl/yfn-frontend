import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Shield,
  Users
} from "lucide-react";

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="h-14 flex items-center px-4 border-b">
        <h1 className="text-xl font-bold flex items-center">
          <Shield className="mr-2 h-5 w-5" />
          Admin Panel
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive>
              <div>
                <Users className="h-4 w-4" />
                <span>Users</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="text-xs text-muted-foreground">Admin Panel v1.0</div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

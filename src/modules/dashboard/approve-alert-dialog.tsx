import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useSelectedUserStore } from "./store/use-selected-user";

export const ApproveUserDialog = () => {
  const user = useSelectedUserStore(e => e.approvalUser);
  const setApprovalUser = useSelectedUserStore(e => e.setApprovalUser);
  return (
    <AlertDialog open={!!user} onOpenChange={e => setApprovalUser(e?user:undefined)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Approve User</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to approve {user?.name} (ID: {user?.id})? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Approve</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

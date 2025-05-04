import { format } from "date-fns/format";

// Format date or return placeholder
export const formatDate = (dateString: string | null) => {
  if (!dateString) return "Not provided";
  try {
    return format(new Date(dateString), "PPP");
  } catch (error) {
    console.error(error);
    return "Invalid date";
  }
};

// Get initials for avatar fallback
export const getInitials = (name: string) => name.at(0)?.toUpperCase() ?? "";

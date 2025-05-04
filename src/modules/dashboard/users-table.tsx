import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ISectorMember } from "@/constants/sectorSchema";
import {
  AtSign,
  Calendar,
  InfoIcon as Id,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { useState } from "react";
import { UserTableRow } from "./user-table-row";

// Sample data from the provided JSON
const initialUsers: ISectorMember[] = [
  {
    id: 342,
    is_approved: true,
    role: null,
    position: "cc",
    name: "z",
    name_en: null,
    username: "zz",
    phone: null,
    dob: null,
    photo: null,
    citizenship_no: null,
    citizenship_front: null,
    citizenship_back: null,
    geography_details: null,
  },
  {
    id: 341,
    is_approved: true,
    role: null,
    position: "bb",
    name: "y",
    name_en: null,
    username: "yy",
    phone: null,
    dob: null,
    photo: null,
    citizenship_no: null,
    citizenship_front: null,
    citizenship_back: null,
    geography_details: null,
  },
  {
    id: 340,
    is_approved: false,
    role: null,
    position: "aa",
    name: "x",
    name_en: null,
    username: "xx",
    phone: null,
    dob: null,
    photo: null,
    citizenship_no: null,
    citizenship_front: null,
    citizenship_back: null,
    geography_details: null,
  },
];

export function UsersTable() {
  const [users] = useState(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">
                <Id className="h-4 w-4 mr-1 inline" /> ID
              </TableHead>
              <TableHead>
                <User className="h-4 w-4 mr-1 inline" /> Name
              </TableHead>
              <TableHead>
                <AtSign className="h-4 w-4 mr-1 inline" /> Username
              </TableHead>
              <TableHead>
                <Phone className="h-4 w-4 mr-1 inline" /> Phone
              </TableHead>
              <TableHead>
                <Shield className="h-4 w-4 mr-1 inline" /> Role
              </TableHead>
              <TableHead>
                <Calendar className="h-4 w-4 mr-1 inline" /> Date of Birth
              </TableHead>
              <TableHead>Photo</TableHead>
              <TableHead>Approval Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map(user => (
              <UserTableRow user={user} key={user.id} />
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;

            // Show first page, current page, last page, and pages around current
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    onClick={() => setCurrentPage(pageNumber)}
                    isActive={currentPage === pageNumber}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            }

            // Show ellipsis for gaps
            if (pageNumber === 2 && currentPage > 3) {
              return (
                <PaginationItem key="ellipsis-start">
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            if (pageNumber === totalPages - 1 && currentPage < totalPages - 2) {
              return (
                <PaginationItem key="ellipsis-end">
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return null;
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage(prev => Math.min(prev + 1, totalPages))
              }
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

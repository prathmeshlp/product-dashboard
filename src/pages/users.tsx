import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { Input } from "@/components/ui/input";
import { type User } from "@/types/user.types";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const PAGE_SIZE = 10;

const UsersPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data, isLoading } = useUsers({
    page,
    limit: PAGE_SIZE,
    search,
  });

  const users = data?.users ?? [];
  const total = data?.total ?? 0;

  if (isLoading) return <div>Loading users...</div>;

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search users..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <table className="w-full border">
        <thead>
          <tr className="bg-muted text-left">
            <th className="p-2">Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t cursor-pointer"
              onClick={() => setSelectedUser(user)}
            >
              <td className="p-2">
                <img
                  src={user.image}
                  alt={user.firstName}
                  className="w-8 h-8 rounded-full"
                />
              </td>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.company.name}</td>
              <td>{user.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end gap-2">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>
          Page {page} / {Math.ceil(total / PAGE_SIZE)}
        </span>
        <button
          disabled={page >= total / PAGE_SIZE}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* User Detail Modal */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          {selectedUser && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">
                {selectedUser.firstName} {selectedUser.lastName}
              </h2>
              <p>Email: {selectedUser.email}</p>
              <p>Phone: {selectedUser.phone}</p>
              <p>Address: {selectedUser.address.address}</p>
              <p>Company: {selectedUser.company.name}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;

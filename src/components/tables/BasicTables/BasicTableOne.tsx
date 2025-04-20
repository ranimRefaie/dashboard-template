
import { forwardRef, useImperativeHandle, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { FiTrash2, FiEdit, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { Modal } from "../../ui/modal";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import Button from "../../ui/button/Button";
import FileInput from "../../form/input/FileInput";
import { toast } from "react-toastify";

interface User {
  id: number;
  user: {
    image: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    isActive: boolean;
  };
}

const initialData: User[] = [
  {
    id: 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      email: "lindsey@example.com",
      phone: "+1 234 567 890",
      address: "New York, USA",
      isActive: true,
    },
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      email: "kaiya@example.com",
      phone: "+1 345 678 901",
      address: "London, UK",
      isActive: false,
    },
  },
  {
    id: 3,
    user: {
      image: "/images/user/user-19.jpg",
      name: "Zain Geidt",
      email: "zain@example.com",
      phone: "+1 456 789 012",
      address: "Berlin, Germany",
      isActive: true,
    },
  },
  {
    id: 4,
    user: {
      image: "/images/user/user-20.jpg",
      name: "Abram Schleifer",
      email: "abram@example.com",
      phone: "+1 567 890 123",
      address: "Paris, France",
      isActive: true,
    },
  },
  {
    id: 5,
    user: {
      image: "/images/user/user-21.jpg",
      name: "Carla George",
      email: "carla@example.com",
      phone: "+1 678 901 234",
      address: "Tokyo, Japan",
      isActive: false,
    },

  },
  {
    id: 6,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      email: "lindsey@example.com",
      phone: "+1 234 567 890",
      address: "New York, USA",
      isActive: true,
    },
  },
  {
    id: 7,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      email: "kaiya@example.com",
      phone: "+1 345 678 901",
      address: "London, UK",
      isActive: false,
    },
  },
  {
    id: 8,
    user: {
      image: "/images/user/user-19.jpg",
      name: "Zain Geidt",
      email: "zain@example.com",
      phone: "+1 456 789 012",
      address: "Berlin, Germany",
      isActive: true,
    },
  },
  {
    id: 9,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      email: "lindsey@example.com",
      phone: "+1 234 567 890",
      address: "New York, USA",
      isActive: true,
    },
  },
  {
    id: 10,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      email: "kaiya@example.com",
      phone: "+1 345 678 901",
      address: "London, UK",
      isActive: false,
    },
  },
  {
    id: 11,
    user: {
      image: "/images/user/user-19.jpg",
      name: "Zain Geidt",
      email: "zain@example.com",
      phone: "+1 456 789 012",
      address: "Berlin, Germany",
      isActive: true,
    },
  },
];

export interface UsersTableHandle {
  handleAdd: () => void;
}

const UsersTable = forwardRef<UsersTableHandle>((_, ref) => {
  const [users, setUsers] = useState<User[]>(initialData);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<User['user']>({
    image: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    isActive: true
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showStatusConfirm, setShowStatusConfirm] = useState(false);
  const [userToAction, setUserToAction] = useState<{ id: number, isActive?: boolean } | null>(null);

  const rowsPerPage = 5;
  const totalPages = Math.ceil(users.length / rowsPerPage);
  const currentUsers = users.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleDelete = (id: number) => {
    setUserToAction({ id });
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (!userToAction) return;

    setUsers(users.filter(user => user.id !== userToAction.id));
    setShowDeleteConfirm(false);
    toast.success("User deleted successfully");
  };

  const handleStatusChange = (id: number, isActive: boolean) => {
    setUserToAction({ id, isActive });
    setShowStatusConfirm(true);
  };

  const confirmStatusChange = () => {
    if (!userToAction) return;

    setUsers(users.map(user =>
      user.id === userToAction.id ? {
        ...user,
        user: { ...user.user, isActive: userToAction.isActive! }
      } : user
    ));
    setShowStatusConfirm(false);
    toast.success(`User ${userToAction.isActive ? "activated" : "deactivated"} successfully`);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData(user.user);
    setIsAdding(false);
    setIsModalOpen(true);
  };

  useImperativeHandle(ref, () => ({
    handleAdd: () => {
      setEditingUser(null);
      setFormData({
        image: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        isActive: true
      });
      setIsAdding(true);
      setIsModalOpen(true);
    }
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUser) {
      setUsers(users.map(user =>
        user.id === editingUser.id ? { ...user, user: formData } : user
      ));
      toast.success("User updated successfully");
    } else {
      const newUser = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        user: {
          ...formData,
          image: formData.image || '/images/user/user-01.jpg'
        }
      };
      setUsers([...users, newUser]);
      toast.success("User added successfully");
    }
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, image: event.target?.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">



      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-3 py-2 sm:px-5 sm:py-4 font-medium text-gray-500  text-theme-xs dark:text-gray-400">User</TableCell>
              <TableCell isHeader className="px-3 py-2 sm:px-5 sm:py-4 font-medium text-gray-500  text-theme-xs dark:text-gray-400">Email</TableCell>
              <TableCell isHeader className="px-3 py-2 sm:px-5 sm:py-4 font-medium text-gray-500  text-theme-xs dark:text-gray-400 ">Phone</TableCell>
              <TableCell isHeader className="px-3 py-2 sm:px-5 sm:py-4 font-medium text-gray-500  text-theme-xs dark:text-gray-400 ">Address</TableCell>
              <TableCell isHeader className="px-3 py-2 sm:px-5 sm:py-4 font-medium text-gray-500  text-theme-xs dark:text-gray-400">Status</TableCell>
              <TableCell isHeader className="px-3 py-2 sm:px-5 sm:py-4 font-medium text-gray-500  text-theme-xs dark:text-gray-400">Actions</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {currentUsers.map(({ id, user }) => (
              <TableRow key={id}>
                <TableCell className="px-3 py-2 sm:px-5 sm:py-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                    />
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90 truncate ">
                      {user.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className=" font-medium text-gray-500 text-theme-sm dark:text-gray-400 truncate  px-3 py-2 sm:px-5 sm:py-4">{user.email}</TableCell>
                <TableCell className=" font-medium text-gray-500 text-theme-sm dark:text-gray-400 truncate px-3 py-2 sm:px-5 sm:py-4">{user.phone}</TableCell>
                <TableCell className=" font-medium text-gray-500 text-theme-sm dark:text-gray-400 truncate px-3 py-2 sm:px-5 sm:py-4">{user.address}</TableCell>
                <TableCell className="px-3 py-2 sm:px-4 sm:py-3">
                  <Badge size="sm" color={user.isActive ? "success" : "error"}>
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="px-3 py-2 sm:px-4 sm:py-3">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button onClick={() => handleDelete(id)} className="p-1 text-red-500 hover:text-red-700">
                      <FiTrash2 size={16} />
                    </button>
                    <button onClick={() => handleEdit({ id, user })} className="p-1 text-blue-500 hover:text-blue-700">
                      <FiEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleStatusChange(id, !user.isActive)}
                      className={`p-1 ${user.isActive ? 'text-orange-500 hover:text-orange-700' : 'text-green-500 hover:text-green-700'}`}
                    >
                      {user.isActive ? <FiXCircle size={16} /> : <FiCheckCircle size={16} />}
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center p-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`mx-1 px-2 py-1 sm:px-3 sm:py-1 rounded text-sm sm:text-base ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] bg-white rounded-3xl dark:bg-gray-900">
          <div className="p-4 lg:p-6">
            <div className="px-2">
              <h4 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
                {isAdding ? 'Add New User' : 'Edit User Information'}
              </h4>
              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                {isAdding ? 'Fill in the details to add a new user' : 'Update the user details'}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="max-h-[70vh] overflow-y-auto px-2">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                  <div className="sm:col-span-2 lg:col-span-1">
                    <Label>Full Name</Label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="sm:col-span-2 lg:col-span-1">
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="sm:col-span-2 lg:col-span-1">
                    <Label>Phone Number</Label>
                    <Input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="sm:col-span-2 lg:col-span-1">
                    <Label>Address</Label>
                    <Input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">Image</label>
                    <div className="flex items-center gap-4">
                      {formData.image && (
                        <img
                          src={formData.image}
                          alt="User"
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      )}
                      <FileInput onChange={handleImageChange} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white dark:bg-gray-900 pt-4 pb-2 px-2 mt-4  dark:border-gray-700">
                <div className="flex justify-end gap-3">
                  <Button size="sm" variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button size="sm">
                    {isAdding ? 'Add User' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} className="max-w-[400px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] bg-white rounded-3xl dark:bg-gray-900">
          <div className="p-4 lg:p-6">
            <div className="px-2">
              <h4 className="mb-5 mt-2 text-xl font-semibold text-gray-800 dark:text-white/90">
                Confirm Deletion
              </h4>
              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this user? This action cannot be undone.
              </p>
            </div>
            <div className="sticky bottom-0 bg-white dark:bg-gray-900 pt-4 pb-2 px-2 mt-4  dark:border-gray-700">
              <div className="flex justify-center gap-3">
                <Button size="sm" variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                  Cancel
                </Button>
                <Button onClick={confirmDelete} size="sm" className="bg-red-600 hover:bg-red-700">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Status Change Confirmation Modal */}
      <Modal isOpen={showStatusConfirm} onClose={() => setShowStatusConfirm(false)} className="max-w-[400px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] bg-white rounded-3xl dark:bg-gray-900">
          <div className="p-4 lg:p-6">
            <div className="px-2">
              <h4 className="mb-5 mt-2 text-xl font-semibold text-gray-800 dark:text-white/90">
              Confirm Status Change
              </h4>
              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              {userToAction?.isActive
              ? "Are you sure you want to activate this user?"
              : "Are you sure you want to deactivate this user?"}
              </p>
            </div>
            <div className="sticky bottom-0 bg-white dark:bg-gray-900 pt-4 pb-2 px-2 mt-4  dark:border-gray-700">
              <div className="flex justify-center gap-3">
                <Button size="sm" variant="outline" onClick={() => setShowStatusConfirm(false)}>
                  Cancel
                </Button>
                <Button onClick={confirmStatusChange} size="sm">
                Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
});

UsersTable.displayName = "UsersTable";
export default UsersTable;
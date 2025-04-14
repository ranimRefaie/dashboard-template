
import { forwardRef, useImperativeHandle, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { FiTrash2, FiEdit, FiCheckCircle, FiXCircle, FiX } from "react-icons/fi";

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
  const [showForm, setShowForm] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

 // Pagination Logic
 const totalPages = Math.ceil(users.length / rowsPerPage);
 const currentUsers = users.slice(
   (currentPage - 1) * rowsPerPage,
   currentPage * rowsPerPage
 );

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsAdding(false);
    setShowForm(true);
  };

  const handleStatusChange = (id: number, isActive: boolean) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, user: { ...user.user, isActive } } : user
    ));
  };

  useImperativeHandle(ref, () => ({
    handleAdd: () => {
      setEditingUser(null);
      setIsAdding(true);
      setShowForm(true);
    }
  }));


  const handleSubmit = (userData: User['user']) => {
    if (editingUser) {
      setUsers(users.map(user =>
        user.id === editingUser.id ? { ...user, user: userData } : user
      ));
    } else {
      const newUser = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        user: {
          ...userData,
          image: userData.image || '/images/user/user-01.jpg' // استخدم الصورة المحددة أو الافتراضية
        }
      };
      setUsers([...users, newUser]);
    }
    setShowForm(false);
  };
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                ID
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                User
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Phone
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Address
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {currentUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  {user.id}
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        width={40}
                        height={40}
                        src={user.user.image}
                        alt={user.user.name}
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {user.user.name}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.user.email}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.user.phone}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.user.address}
                </TableCell>
                <TableCell className="px-4 py-3 text-start">
                  <Badge
                    size="sm"
                    color={user.user.isActive ? "success" : "error"}
                  >
                    {user.user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-2">
                  <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700">
                        <FiTrash2 size={16} />
                      </button>
                      <button onClick={() => handleEdit(user)} className="text-blue-500 hover:text-blue-700">
                        <FiEdit size={16} />
                      </button>
                      {user.user.isActive ? (
                        <button onClick={() => handleStatusChange(user.id, false)} className="text-orange-500 hover:text-orange-700">
                          <FiXCircle size={16} />
                        </button>
                      ) : (
                        <button onClick={() => handleStatusChange(user.id, true)} className="text-green-500 hover:text-green-700">
                          <FiCheckCircle size={16} />
                        </button>
                      )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center p-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

      {showForm && (
        <UserForm
          user={editingUser?.user}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
          isAdding={isAdding}
        />
      )}
    </div>
  );
});

UsersTable.displayName = "UsersTable";

export default UsersTable;


function UserForm({ user, onClose, onSubmit, isAdding }: {
  user?: User['user'];
  onClose: () => void;
  onSubmit: (data: User['user']) => void;
  isAdding: boolean;
}) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    isActive: user?.isActive || true,
    image: user?.image || "/images/user/default.jpg"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, image: event.target?.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };


  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-[40%] shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            {isAdding ? "Add New User" : "Edit User"}
          </h4>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FiX size={25} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 outline-0 text-gray-700 dark:text-gray-100"
              />
              {formData.image && (
                <img src={formData.image} alt="" className="mt-2 w-20 h-20 rounded-full object-cover" />
              )}
            </div>
            <div className="flex justify-between">
              <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 outline-0 text-gray-700 dark:text-gray-100"
                required
              />
             
              </div>

              <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 ">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-gray-100"
                required
              />
              </div>
            </div>

            <div className="flex justify-between">
              <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-gray-100 "
                required
              />
              </div>

              <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-gray-100"
                required
              />
              </div>
            </div>

            <div className="flex items-center">
            <input
                type="checkbox"
                name="isActive"
                id="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="mr-2 h-5 w-5 text-green-500 rounded focus:ring-green-500"
              />
              <label htmlFor="isActive" className="text-sm font-medium">
                Active
              </label>
            </div>
          </div>

      
          <div className="mt-6 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {isAdding ? "Add User" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
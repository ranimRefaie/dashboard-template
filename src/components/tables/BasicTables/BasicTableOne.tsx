import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { FiTrash2, FiEdit, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { Modal } from "../../ui/modal";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import Button from "../../ui/button/Button";
import FileInput from "../../form/input/FileInput";
import { toast } from "react-toastify";
import { TableCellWithFilter } from "./TableCellWithFilter";


type FilterType = 'startWith' | 'contains' | 'notContains' | 'endsWith' | 'equals' | 'notEquals' | 'noFilter';

interface ColumnFilter {
  searchTerm: string;
  filterType: FilterType;
}

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
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialData);
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

  // حالة الفلاتر لكل عمود
  const [columnFilters, setColumnFilters] = useState<Record<string, ColumnFilter>>({
    name: { searchTerm: '', filterType: 'noFilter' },
    email: { searchTerm: '', filterType: 'noFilter' },
    phone: { searchTerm: '', filterType: 'noFilter' },
    address: { searchTerm: '', filterType: 'noFilter' },
    status: { searchTerm: '', filterType: 'noFilter' }
  });

  const [, setActiveFilterMenu] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showStatusConfirm, setShowStatusConfirm] = useState(false);
  const [userToAction, setUserToAction] = useState<{ id: number, isActive?: boolean } | null>(null);

  const rowsPerPage = 5;



  const applyFilters = () => {
    let result = users;

    // فلترة لكل عمود
    Object.entries(columnFilters).forEach(([column, filter]) => {
      if (filter.searchTerm && filter.filterType !== 'noFilter') {
        const term = filter.searchTerm.toLowerCase();

        result = result.filter(user => {
          let value = '';
          if (column === 'status') {
            value = user.user.isActive ? 'active' : 'inactive';
          } else {
            value = String(user.user[column as keyof User['user']]).toLowerCase();
          }

          switch (filter.filterType) {
            case 'startWith': return value.startsWith(term);
            case 'contains': return value.includes(term);
            case 'notContains': return !value.includes(term);
            case 'endsWith': return value.endsWith(term);
            case 'equals': return value === term;
            case 'notEquals': return value !== term;
            default: return true;
          }
        });
      }
    });

    setFilteredUsers(result);
    setCurrentPage(1);
  };

  useEffect(() => {
    applyFilters();
  }, [users, columnFilters]);

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const currentUsers = filteredUsers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

 
  const handleSearchChange = (column: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: {
        ...prev[column],
        searchTerm: value
      }
    }));
  };


  const handleFilterTypeChange = (column: string, type: FilterType) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: {
        ...prev[column],
        filterType: type
      }
    }));
    setActiveFilterMenu(null);
  };

  const handleDelete = (id: number) => {
    setUserToAction({ id });
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter(user => user.id !== userToAction?.id));
    setShowDeleteConfirm(false);
    toast.success("User deleted successfully");
  };

  const handleStatusChange = (id: number, isActive: boolean) => {
    setUserToAction({ id, isActive });
    setShowStatusConfirm(true);
  };

  const confirmStatusChange = () => {
    setUsers(users.map(user =>
      user.id === userToAction?.id ? { ...user, user: { ...user.user, isActive: userToAction.isActive! } } : user
    ));
    setShowStatusConfirm(false);
    toast.success(`User ${userToAction?.isActive ? "activated" : "deactivated"} successfully`);
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
    if (e.target.files && e.target.files[0]) {
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
  {/* السطر الأول: عناوين الأعمدة */}
  <TableRow className="border-b border-gray-200">
    <TableCell isHeader className="px-3 py-2 sm:px-5 sm:py-3 font-medium text-gray-500 dark:text-gray-400">
      User
    </TableCell>
    <TableCell isHeader className="px-3 py-2 sm:px-5 sm:py-3 font-medium text-gray-500 dark:text-gray-400">
      Email
    </TableCell>
    <TableCell isHeader className="px-3 py-2 sm:px-5 sm:py-3 font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">
      Phone
    </TableCell>
    <TableCell isHeader className="px-3 py-2 sm:px-5 sm:py-3 font-medium text-gray-500 dark:text-gray-400 hidden lg:table-cell">
      Address
    </TableCell>
    <TableCell isHeader className="px-3 py-2 sm:px-5 sm:py-3 font-medium text-gray-500 dark:text-gray-400">
      Status
    </TableCell>
    <TableCell isHeader className="px-3 py-2 sm:px-5 sm:py-3 font-medium text-gray-500 dark:text-gray-400">
      Actions
    </TableCell>
  </TableRow>

  {/* السطر الثاني: حقول البحث والفلتر */}
  <TableRow>
    <TableCell className="px-3 py-2 sm:px-5 sm:py-3 bg-gray-50 dark:bg-gray-800">
      <TableCellWithFilter
        columnLabel="User"
        searchTerm={columnFilters.name.searchTerm}
        filterType={columnFilters.name.filterType}
        onSearchChange={(value) => handleSearchChange('name', value)}
        onFilterTypeChange={(type) => handleFilterTypeChange('name', type)}
      />
    </TableCell>
    <TableCell className="px-3 py-2 sm:px-5 sm:py-3 bg-gray-50 dark:bg-gray-800">
      <TableCellWithFilter
        columnLabel="Email"
        searchTerm={columnFilters.email.searchTerm}
        filterType={columnFilters.email.filterType}
        onSearchChange={(value) => handleSearchChange('email', value)}
        onFilterTypeChange={(type) => handleFilterTypeChange('email', type)}
      />
    </TableCell>
    <TableCell className="px-3 py-2 sm:px-5 sm:py-3 bg-gray-50 dark:bg-gray-800 hidden md:table-cell">
      <TableCellWithFilter
        columnLabel="Phone"
        searchTerm={columnFilters.phone.searchTerm}
        filterType={columnFilters.phone.filterType}
        onSearchChange={(value) => handleSearchChange('phone', value)}
        onFilterTypeChange={(type) => handleFilterTypeChange('phone', type)}
      />
    </TableCell>
    <TableCell className="px-3 py-2 sm:px-5 sm:py-3 bg-gray-50 dark:bg-gray-800 hidden lg:table-cell">
      <TableCellWithFilter
        columnLabel="Address"
        searchTerm={columnFilters.address.searchTerm}
        filterType={columnFilters.address.filterType}
        onSearchChange={(value) => handleSearchChange('address', value)}
        onFilterTypeChange={(type) => handleFilterTypeChange('address', type)}
      />
    </TableCell>
    <TableCell className="px-3 py-2 sm:px-5 sm:py-3 bg-gray-50 dark:bg-gray-800">
      <TableCellWithFilter
        columnLabel="Status"
        searchTerm={columnFilters.status.searchTerm}
        filterType={columnFilters.status.filterType}
        onSearchChange={(value) => handleSearchChange('status', value)}
        onFilterTypeChange={(type) => handleFilterTypeChange('status', type)}
      />
    </TableCell>

    <TableCell className="px-3 py-2 sm:px-5 sm:py-3 bg-gray-50 dark:bg-gray-800">
      <></>
    </TableCell>
    
  </TableRow>
</TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {currentUsers.map(({ id, user }) => (
              <TableRow key={id}>
                <TableCell className="px-3 py-2 sm:px-5 sm:py-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <img src={user.image} alt={user.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" />
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-500 text-start text-theme-sm dark:text-gray-400">{user.email}</TableCell>
                <TableCell className="text-gray-500 text-start text-theme-sm dark:text-gray-400">{user.phone}</TableCell>
                <TableCell className="text-gray-500 text-start text-theme-sm dark:text-gray-400">{user.address}</TableCell>
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
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {isAdding ? 'Add New User' : 'Edit User Information'}
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              {isAdding ? 'Fill in the details to add a new user' : 'Update the user details'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">


                <div className="col-span-2 lg:col-span-1">
                  <Label>Full Name</Label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}

                  />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}

                  />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label>Phone Number</Label>
                  <Input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label>Address</Label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>

              </div>
              <div className="mt-5">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Image</label>

                <div className="flex items-center gap-4">
                  {formData.image && (
                    <img src={formData.image} alt="" className="mt-2 w-20 h-20 rounded-full object-cover" />
                  )}
                  <FileInput onChange={handleImageChange} />

                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button size="sm">
                {isAdding ? 'Add User' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} className="max-w-md">
        <div className="p-6 text-center">
          <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Confirm Deletion</h3>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this user? This action cannot be undone.
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      {/* Status Change Confirmation Modal */}
      <Modal isOpen={showStatusConfirm} onClose={() => setShowStatusConfirm(false)} className="max-w-md">
        <div className="p-6 text-center">
          <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
            Confirm Status Change
          </h3>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            {userToAction?.isActive
              ? "Are you sure you want to activate this user?"
              : "Are you sure you want to deactivate this user?"}
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={() => setShowStatusConfirm(false)}>
              Cancel
            </Button>
            <Button onClick={confirmStatusChange}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
});

UsersTable.displayName = "UsersTable";
export default UsersTable;



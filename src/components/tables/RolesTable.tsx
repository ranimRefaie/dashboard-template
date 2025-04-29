import { forwardRef, useState, useImperativeHandle } from "react";
import { FiEdit, FiTrash2, FiUsers } from "react-icons/fi";
import { toast } from "react-toastify";
import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import Checkbox from "../form/input/Checkbox";

interface Role {
    id: number;
    name: string;
    description: string;
    usersCount: number;
    permissions: string[];
}

// دالة لاستخراج جميع الإجراءات المتاحة من الصلاحيات
const getAvailableActions = (permissions: string[]) => {
    const actions = new Set<string>();
    permissions.forEach(permission => {
        const action = permission.split(':')[1];
        actions.add(action);
    });
    return Array.from(actions);
};

// دالة لتحويل الصلاحيات إلى شكل جدولي
const getPermissionMatrix = (permissions: string[]) => {
    const matrix: Record<string, Record<string, boolean>> = {};
    const actions = getAvailableActions(permissions);

    permissions.forEach(permission => {
        const [category, action] = permission.split(':');
        if (!matrix[category]) {
            matrix[category] = {};
            actions.forEach(a => {
                matrix[category][a] = false;
            });
        }
        matrix[category][action] = true;
    });

    return {
        matrix,
        actions: actions.sort()
    };
};

const initialRoles: Role[] = [
    {
        id: 1,
        name: "Super Admin",
        description: "Full access to all features",
        usersCount: 5,
        permissions: [
            "dashboard:view",
            "users:create",
            "users:update",
            "users:delete",
            "users:view",
            "content:read",
            "content:write",
            "content:delete",
            "settings:read",
            "settings:write",
            "role:manage",
            "role:view"
        ],
    },
    {
        id: 2,
        name: "Admin",
        description: "Can create and edit users",
        usersCount: 12,
        permissions: [
            "dashboard:view",
            "users:create",
            "users:update",
            "users:view",
            "content:read",
            "content:write",
        ],
    },
    {
        id: 3,
        name: "Viewer",
        description: "Can only view content",
        usersCount: 25,
        permissions: [
            "dashboard:view",
            "content:read",
            "users:view"
        ],
    },
];

export interface RolesTableHandle {
    handleAdd: () => void;
}

const RolesTable = forwardRef<RolesTableHandle>((_, ref) => {
    const [roles, setRoles] = useState<Role[]>(initialRoles);
    const [editingRole, setEditingRole] = useState<Role | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState<Omit<Role, "id" | "usersCount">>({
        name: "",
        description: "",
        permissions: [],
    });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState<number | null>(null);

    const rowsPerPage = 5;
    const totalPages = Math.ceil(roles.length / rowsPerPage);
    const currentRoles = roles.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const availablePermissions = [
        "dashboard:view",
        "users:create",
        "users:update",
        "users:delete",
        "users:view",
        "content:read",
        "content:write",
        "content:delete",
        "settings:read",
        "settings:write",
        "role:manage",
        "role:view"
    ];

    // تحضير بيانات الجدول
    const { matrix: permissionMatrix, actions } = getPermissionMatrix(availablePermissions);
    const categories = Object.keys(permissionMatrix).sort();

    const handleDelete = (id: number) => {
        setRoleToDelete(id);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        if (!roleToDelete) return;

        setRoles(roles.filter((role) => role.id !== roleToDelete));
        setShowDeleteConfirm(false);
        toast.success("Role deleted successfully");
    };

    const handleEdit = (role: Role) => {
        setEditingRole(role);
        setFormData({
            name: role.name,
            description: role.description,
            permissions: role.permissions,
        });
        setIsAdding(false);
        setIsModalOpen(true);
    };

    useImperativeHandle(ref, () => ({
        handleAdd: () => {
            setEditingRole(null);
            setFormData({
                name: "",
                description: "",
                permissions: [],
            });
            setIsAdding(true);
            setIsModalOpen(true);
        },
    }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingRole) {
            setRoles(
                roles.map((role) =>
                    role.id === editingRole.id
                        ? {
                            ...role,
                            ...formData,
                        }
                        : role
                )
            );
            toast.success("Role updated successfully");
        } else {
            const newRole = {
                id: Math.max(...roles.map((r) => r.id), 0) + 1,
                ...formData,
                usersCount: 0,
            };
            setRoles([...roles, newRole]);
            toast.success("Role added successfully");
        }
        setIsModalOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePermissionChange = (permission: string, isChecked: boolean) => {
        setFormData((prev) => {
            let newPermissions;
            if (isChecked) {
                newPermissions = [...prev.permissions, permission];
            } else {
                newPermissions = prev.permissions.filter(p => p !== permission);
            }
            return { ...prev, permissions: newPermissions };
        });
    };

    // دالة للتحقق إذا كانت الصلاحية مفعلة
    const isPermissionChecked = (permission: string) => {
        return formData.permissions.includes(permission);
    };

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full">
                    <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                        <tr>
                            <th className="px-3 py-2 sm:px-5 sm:py-4 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-left">
                                Role
                            </th>
                            <th className="px-3 py-2 sm:px-5 sm:py-4 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-left">
                                Description
                            </th>
                            <th className="px-3 py-2 sm:px-5 sm:py-4 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-left">
                                Users
                            </th>
                            <th className="px-3 py-2 sm:px-5 sm:py-4 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-left">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {currentRoles.map((role) => (
                            <tr key={role.id}>
                                <td className="px-3 py-2 sm:px-5 sm:py-4">
                                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                        {role.name}
                                    </span>
                                </td>
                                <td className="font-medium text-gray-500 text-theme-sm dark:text-gray-400 px-3 py-2 sm:px-5 sm:py-4">
                                    {role.description}
                                </td>
                                <td className="font-medium text-gray-500 text-theme-sm dark:text-gray-400 px-3 py-2 sm:px-5 sm:py-4">
                                    <div className="flex items-center gap-2">
                                        <FiUsers size={16} />
                                        {role.usersCount}
                                    </div>
                                </td>
                                <td className="px-3 py-2 sm:px-4 sm:py-3">
                                    <div className="flex items-center gap-1 sm:gap-2">
                                        <button
                                            onClick={() => handleEdit(role)}
                                            className="p-1 text-blue-500 hover:text-blue-700"
                                        >
                                            <FiEdit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(role.id)}
                                            className="p-1 text-red-500 hover:text-red-700"
                                        >
                                            <FiTrash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center p-4">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`mx-1 px-2 py-1 sm:px-3 sm:py-1 rounded text-sm sm:text-base ${currentPage === i + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}

            {/* Add/Edit Role Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-[800px] m-4">
                <div className="no-scrollbar relative w-full max-w-[800px] bg-white rounded-3xl dark:bg-gray-900">
                    <div className="p-4 lg:p-6">
                        <div className="px-2">
                            <h4 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
                                {isAdding ? "Add New Role" : "Edit Role"}
                            </h4>
                            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                {isAdding
                                    ? "Fill in the details to add a new role"
                                    : "Update the role details"}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="max-h-[70vh] overflow-y-auto px-2">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                                    <div className="sm:col-span-2 lg:col-span-1">
                                        <Label> Role Name</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="sm:col-span-2 lg:col-span-1">
                                        <Label>Description</Label>
                                        <Input
                                            type="text"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <Label>Permissions</Label>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full border rounded-lg dark:border-gray-700">
                                                <thead className="bg-gray-50 dark:bg-gray-800">
                                                    <tr>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                            Category
                                                        </th>
                                                        {actions.map(action => (
                                                            <th key={action} className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider capitalize">
                                                                {action}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                                                    {categories.map(category => (
                                                        <tr key={category}>
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 capitalize">
                                                                {category}
                                                            </td>
                                                            {actions.map(action => {
                                                                const permission = `${category}:${action}`;
                                                                const isChecked = isPermissionChecked(permission);
                                                                return (
                                                                    <td className="px-4 py-3 text-center align-middle">
                                                                        <div className="flex justify-center">
                                                                            <Checkbox
                                                                                checked={isChecked}
                                                                                onChange={(checked) => handlePermissionChange(permission, checked)}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                );
                                                            })}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="sticky bottom-0 bg-white dark:bg-gray-900 pt-4 pb-2 px-2 mt-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex justify-end gap-3">
                                    <Button size="sm" variant="outline" onClick={() => setIsModalOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button size="sm">
                                        {isAdding ? "Add Role" : "Save Changes"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                className="max-w-[400px] m-4"
            >
                <div className="no-scrollbar relative w-full max-w-[700px] bg-white rounded-3xl dark:bg-gray-900">
                    <div className="p-4 lg:p-6">
                        <div className="px-2">
                            <h4 className="mb-5 mt-0 md:mt-2 text-xl font-semibold text-gray-800 dark:text-white/90">
                                Confirm Deletion
                            </h4>
                            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this role? This action cannot be
                                undone.
                            </p>
                        </div>
                        <div className="sticky bottom-0 bg-white dark:bg-gray-900 pt-4 pb-2 px-2 mt-4 dark:border-gray-700">
                            <div className="flex justify-center gap-3">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
});

RolesTable.displayName = "RolesTable";
export default RolesTable;
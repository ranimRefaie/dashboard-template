import { useRef } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import UsersTable, { UsersTableHandle } from "../../components/tables/BasicTables/BasicTableOne";
import { FiPlus } from "react-icons/fi";

export default function BasicTables() {
  const usersTableRef = useRef<UsersTableHandle>(null);

  return (
    <>
      <PageMeta title="Users Table" description="Manage users" />
      <PageBreadcrumb pageTitle="Users Table" />
      <div className="space-y-6">
        <ComponentCard
          title={
            <div className="flex items-center justify-between">
              <span>Users Table</span>
              <button
                onClick={() => usersTableRef.current?.handleAdd()}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                <FiPlus size={16} />
                Add User
              </button>
            </div>
          }
        >
          <UsersTable ref={usersTableRef} />
        </ComponentCard>
      </div>
    </>
  );
}
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-4">
              
              <button
                onClick={() => usersTableRef.current?.handleAdd()}
                className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 w-full md:w-auto"
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
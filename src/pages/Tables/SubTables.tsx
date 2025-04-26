import { useRef } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import RolesTable, { RolesTableHandle } from "../../components/tables/RolesTable";
import { FiPlus } from "react-icons/fi";


export default function SubTables() {
  const rolesTable = useRef<RolesTableHandle>(null);
  const handleAddRole = () => {
    rolesTable.current?.handleAdd();
  };
  return (
    <>
      <PageMeta title="Roles Table" description="Manage roles" />
      <PageBreadcrumb pageTitle="Roles Table" />
      <div className="space-y-6">
        <ComponentCard
          title={
                     <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-4">
                       
                       <button
          onClick={handleAddRole}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
        >
          <FiPlus /> Add Role
        </button>
                     </div>
                   }
        >
          <RolesTable ref={rolesTable} />
        </ComponentCard>
      </div>
    </>
  );
}
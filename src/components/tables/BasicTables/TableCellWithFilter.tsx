import { useState } from "react";
import { FiFilter, FiSearch } from "react-icons/fi";

type FilterType = 'startWith' | 'contains' | 'notContains' | 'endsWith' | 'equals' | 'notEquals' | 'noFilter';

interface TableCellWithFilterProps {
  columnLabel: string;
  searchTerm: string;
  filterType: FilterType;
  onSearchChange: (value: string) => void;
  onFilterTypeChange: (type: FilterType) => void;
  className?: string;
}

const filterOptions = [
  { value: 'startWith', label: 'Starts With' },
  { value: 'contains', label: 'Contains' },
  { value: 'notContains', label: 'Not Contains' },
  { value: 'endsWith', label: 'Ends With' },
  { value: 'equals', label: 'Equals' },
  { value: 'notEquals', label: 'Not Equals' },
  { value: 'noFilter', label: 'No Filter' },
];

export const TableCellWithFilter = ({
  columnLabel,
  searchTerm,
  filterType,
  onSearchChange,
  onFilterTypeChange,
  className = ""
}: TableCellWithFilterProps) => {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
    
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" size={14} />
        </div>
        <input
          type="text"
          placeholder={`Search`}
          className="block w-full pl-8 pr-2 py-1 border border-gray-300 rounded-md text-sm"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label={`Search ${columnLabel}`}
        />
      </div>
      
      {/* زر الفلتر */}
      <div className="relative">
        <button 
          className="p-1 rounded-md hover:bg-gray-100"
          onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
          aria-label={`Filter ${columnLabel}`}
        >
          <FiFilter 
            className={`text-gray-600 ${filterType !== 'noFilter' ? 'text-blue-500' : ''}`} 
            size={16} 
          />
        </button>
        
        {isFilterMenuOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsFilterMenuOpen(false)}
            />
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
              <div className="py-1">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`block w-full text-left px-4 py-1 text-sm ${
                      filterType === option.value ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      onFilterTypeChange(option.value as FilterType);
                      setIsFilterMenuOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
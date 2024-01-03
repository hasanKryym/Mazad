import { useState } from "react";
import "./UserFilter.css";
import { userFilters, userFilterValues } from "./filterEnum";

const BidsFilter = ({
  selectedStatusFilter,
  setSelectedStatusFilter,
  onFilterChange,
}) => {
  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedStatusFilter(selectedValue);
    onFilterChange("statusFilter", selectedValue);
  };

  return (
    <div className="bids-filter-container">
      <div>
        <label htmlFor="filterSelect" className="filter-label">
          bids Status:
        </label>
        <select
          id="filterSelect"
          className="filter-select"
          value={selectedStatusFilter}
          onChange={handleFilterChange}
        >
          {userFilters.map(({ value, display }) => {
            return <option value={value}>{display}</option>;
          })}
        </select>
      </div>

      {/* <button onClick={() => resetFilters()} className="classic-button">
        reset filters
      </button> */}
    </div>
  );
};

export default BidsFilter;

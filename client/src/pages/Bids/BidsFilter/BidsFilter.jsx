import { useState } from "react";
import "./BidsFilter.css";
import { bidsFilters, bidsValues } from "./filterEnom";

const BidsFilter = ({
  onFilterChange,
  selectedBidsFilter,
  setSelectedBidsFilter,
}) => {
  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedBidsFilter(selectedValue);
    onFilterChange("filter", selectedValue);
  };

  const resetFilters = () => {
    setSelectedBidsFilter(bidsValues.PRESENT);
    onFilterChange(bidsValues.PRESENT);
  };

  return (
    <div className="bids-filter-container">
      <div>
        <label htmlFor="filterSelect" className="filter-label">
          Filter Bids:
        </label>
        <select
          id="filterSelect"
          className="filter-select"
          value={selectedBidsFilter}
          onChange={handleFilterChange}
        >
          {bidsFilters.map(({ value, display }) => {
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

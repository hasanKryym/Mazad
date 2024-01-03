import "./FiltersContainer.css";
import BidsFilter from "../BidsFilter/BidsFilter";
import UserFilter from "../UserFilter/UserFilter";
import { useState } from "react";
import { bidsValues } from "../BidsFilter/filterEnom";
import { userFilterValues } from "../UserFilter/filterEnum";

const FiltersContainer = ({
  filterData,
  setFilterData,
  fetchData,
  filtersContainerClass,
  UpdateFiltersContainerClassName,
}) => {
  const [selectedBidsFilter, setSelectedBidsFilter] = useState(
    bidsValues.PRESENT
  );

  const [selectedStatusFilter, setSelectedStatusFilter] = useState(
    userFilterValues.NONE
  );

  // const handleFilterChange = (selectedFilter) => {
  //   setFilterData((prevState) => {
  //     return { ...prevState, search: "", filter: selectedFilter };
  //   });
  //   fetchData({ search: "", filter: selectedFilter });
  // };

  const handleFilterChange = (name, value) => {
    if (value === "reset") {
      setFilterData((prevState) => {
        return {
          ...prevState,
          search: "",
          filter: bidsValues.PRESENT,
          statusFilter: userFilterValues.NONE,
        };
      });

      fetchData({
        search: "",
        filter: bidsValues.PRESENT,
        statusFilter: userFilterValues.NONE,
      });

      return;
    }

    if (name === "statusFilter" && value === userFilterValues.WON) {
      setSelectedBidsFilter(bidsValues.ENDED);
      setFilterData((prevState) => {
        return {
          ...prevState,
          search: "",
          filter: bidsValues.ENDED,
          statusFilter: value,
        };
      });

      fetchData({ search: "", filter: bidsValues.ENDED, statusFilter: value });
      return;
    }
    setFilterData((prevState) => {
      return { ...prevState, search: "", [name]: value };
    });
    if (name === "filter") {
      const statusFilter = filterData.statusFilter;
      fetchData({ search: "", filter: value, statusFilter });
    }

    if (name === "statusFilter") {
      const filter = filterData.filter;
      fetchData({ search: "", filter, statusFilter: value });
    }
  };

  const resetFilters = () => {
    setSelectedBidsFilter(bidsValues.PRESENT);
    setSelectedStatusFilter(userFilterValues.NONE);
    handleFilterChange("", "reset");
  };

  return (
    <>
      <div className={filtersContainerClass}>
        <BidsFilter
          onFilterChange={handleFilterChange}
          selectedBidsFilter={selectedBidsFilter}
          setSelectedBidsFilter={setSelectedBidsFilter}
        />
        <UserFilter
          selectedStatusFilter={selectedStatusFilter}
          setSelectedStatusFilter={setSelectedStatusFilter}
          onFilterChange={handleFilterChange}
        />
        {/* <button onClick={() => resetFilters()} className="classic-button">
          reset filters
        </button> */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <button className="classic-button" onClick={() => resetFilters()}>
            reset filters
          </button>
          <button
            onClick={() =>
              UpdateFiltersContainerClassName("slide-out-bck-center")
            }
            className="classic-button"
          >
            cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default FiltersContainer;

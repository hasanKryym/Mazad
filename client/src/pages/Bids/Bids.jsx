import { useContext, useEffect, useState } from "react";
import "./Bids.css";
import { fetchBids } from "../../data/api/fetchingData";
import { UserContext } from "../../context/User/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import Bid from "../../components/Bid/Bid";
import Notification from "../../components/Notification/Notification";
import { NOTIFICATION_STATES } from "../../components/Notification/notificationStates";
import Navbar from "../../components/Navbar/Navbar";
import { BidsLoaderContext } from "../../context/Bids/BidsLoadingContext";
import BidsFilter from "./BidsFilter/BidsFilter";
import { bidsValues } from "./BidsFilter/filterEnom";
import FiltersContainer from "./FiltersContainer/FiltersContainer";
import { userFilterValues } from "./UserFilter/filterEnum";
const Bids = () => {
  const location = useLocation();
  const { userData } = useContext(UserContext);
  const [user] = userData;
  const navigate = useNavigate();
  const { loaderData } = useContext(BidsLoaderContext);
  const [isLoading, setIsLoading] = loaderData;

  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({
    state: "",
    message: "",
  });

  // const [showFilterPage, setShowFilterPage] = useState(false);

  const [filterData, setFilterData] = useState({
    search: "",
    filter: bidsValues.PRESENT,
    statusFilter: userFilterValues.NONE,
  });

  const updateFilterData = (search, filter) => {
    setFilterData((prevState) => {
      return { ...prevState, search, filter };
    });
  };

  const handleDismiss = () => {
    setShowNotification(false);
    setNotificationData({
      state: "",
      message: "",
    });
  };

  const updateNotification = (message, state) => {
    setNotificationData({
      ...notificationData,
      message: message,
      state: state,
    });
    setShowNotification(true);
  };

  const [bidsData, setBidsData] = useState([]);
  const updateData = (e) => {
    e.preventDefault();
    if (!filterData.search) return;
    fetchData(filterData);
  };

  const fetchData = async (filterData) => {
    updateNotification("Loading", NOTIFICATION_STATES.LOAD);
    const data = await fetchBids(
      location.pathname !== "/myAccount/bids",
      filterData
    );
    if (data.success) {
      setBidsData(data.bids);
      setIsLoading((prevState) => {
        return { ...prevState, bidsLoaded: true };
      });
    } else {
      updateNotification(data.message, NOTIFICATION_STATES.INFO);
    }
  };

  useEffect(() => {
    if (isLoading.bidsLoaded && isLoading.bidLoaded && isLoading.productLoaded)
      setShowNotification(false);
  }, [isLoading]);

  useEffect(() => {
    if (user.status.isLoggedIn) fetchData(filterData);
  }, []);

  useEffect(() => {
    fetchData(filterData);
  }, [filterData.filter]);

  const handleFilterChange = (selectedFilter) => {
    setFilterData((prevState) => {
      return { ...prevState, search: "", filter: selectedFilter };
    });
    fetchData({ search: "", filter: selectedFilter });
  };

  const [filtersContainerClass, setFilterContainerClass] = useState(
    "filters slide-out-bck-center"
  );

  const UpdateFiltersContainerClassName = (value) => {
    setFilterContainerClass(`filters ${value}`);
  };

  return (
    <>
      {location.pathname !== "/myAccount/bids" && <Navbar />}

      {showNotification && (
        <Notification
          message={notificationData.message}
          state={notificationData.state}
          onDismiss={handleDismiss}
        />
      )}

      <div className="filter_bids-container">
        <form className="filterForm" onSubmit={updateData}>
          <button className="search-btn" type="submit">
            <svg
              width="17"
              height="16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-labelledby="search"
            >
              <path
                d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                stroke="currentColor"
                stroke-width="1.333"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
          <input
            class="input"
            placeholder="search bids"
            required=""
            type="text"
            value={filterData.search}
            onChange={(e) =>
              updateFilterData(e.target.value, filterData.filter)
            }
          />
        </form>
        {/* <button class="reset" type="reset">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button> */}

        <button
          onClick={() => UpdateFiltersContainerClassName("slide-in-fwd-center")}
          className="classic-button"
        >
          Filters
        </button>

        <FiltersContainer
          filterData={filterData}
          setFilterData={setFilterData}
          fetchData={fetchData}
          filtersContainerClass={filtersContainerClass}
          UpdateFiltersContainerClassName={UpdateFiltersContainerClassName}
        />
      </div>

      {bidsData.length !== 0 && user.status.isLoggedIn ? (
        <article className="bids_container">
          {bidsData.map((bid) => (
            <Bid key={bid.id} bidData={bid} />
          ))}
        </article>
      ) : showNotification ? (
        <p></p>
      ) : (
        <div className="center-div">
          <p>no Bids</p>
        </div>
      )}

      {!user.status.isLoggedIn && (
        <div className="center-div">
          <p>please login to access the bids</p>
        </div>
      )}
    </>
  );
};

export default Bids;

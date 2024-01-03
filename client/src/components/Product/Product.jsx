import { useContext, useEffect, useState } from "react";
import "./Product.css";
import { fetchProductById } from "../../data/api/fetchingData";
import { NOTIFICATION_STATES } from "../Notification/notificationStates";
import Notification from "../Notification/Notification";
import { BidsLoaderContext } from "../../context/Bids/BidsLoadingContext";
import { useLocation, Link } from "react-router-dom";

const Product = ({ productId, setShowBtns, showBtns }) => {
  const [productData, setProductData] = useState({});
  const location = useLocation();
  const currentLocation = location.pathname;
  const { id, name, image, description } = productData;

  const [showProductDetails, setShowProductsDetails] = useState(false);
  const [descriptionLength, setDescriptionLength] = useState(0);

  const { loaderData } = useContext(BidsLoaderContext);
  const [isLoading, setIsLoading] = loaderData;

  const fetchProduct = async () => {
    if (currentLocation !== "/bids")
      updateNotification("Loading", NOTIFICATION_STATES.LOAD);

    const response = await fetchProductById(productId);
    if (response.success) {
      setProductData(response.product);
      setDescriptionLength(response.product.description.length);
      if (currentLocation === "/bids" || currentLocation === "/myAccount/bids")
        setIsLoading((prevState) => {
          return { ...prevState, productLoaded: true };
        });

      if (currentLocation !== "/bids") setShowNotification(false);
    } else {
      updateNotification(response.message, NOTIFICATION_STATES.INFO);
    }
  };

  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({
    state: "",
    message: "",
  });

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
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      {showNotification && (
        <Notification
          message={notificationData.message}
          state={notificationData.state}
          onDismiss={handleDismiss}
        />
      )}

      <div className="product-container">
        <h2 className="product-title">{name}</h2>
        <img src={image} alt={name} className="product-image" />
        {descriptionLength > 38 && (
          <Link
            onClick={() => {
              setShowProductsDetails(!showProductDetails);
              setShowBtns(!showBtns);
            }}
          >
            {showProductDetails ? "hide" : "Show more"}
          </Link>
        )}
        <p className={`product-description ${showProductDetails && "view"}`}>
          {description}
        </p>
      </div>
    </>
  );
};

export default Product;

import { RiAuctionLine } from "react-icons/ri";
import "./ProductCard.css";
import { useState } from "react";
import ProductDetails from "../Product/ProductDetails/ProductDetails";
import { useLocation } from "react-router-dom";
import { NOTIFICATION_STATES } from "../Notification/notificationStates";

const ProductCard = ({
  product,
  setFormData,
  setShowProductsPage,
  bidPageNotification,
}) => {
  const { id, userId, name, description, image } = product;
  const [showDetails, setShowDetails] = useState(false);

  const location = useLocation();
  return (
    <>
      {showDetails && (
        <ProductDetails setShowDetails={setShowDetails} product={product} />
      )}
      <div
        className={`card product_container ${
          location.pathname === "/myAccount/bids" && "from-add_bid"
        }`}
      >
        <div className="card-img">
          <img
            onClick={() => setShowDetails(true)}
            title="View Product"
            src={image}
            alt=""
          />
        </div>
        <div className="card-info">
          <p className="text-title">{name} </p>
          <p className={`text-body`}>{description}</p>
        </div>
        <div className="card-footer"></div>
        {location.pathname === "/myAccount/bids" && (
          <>
            <div className="product_card-btn">
              <button
                onClick={() => {
                  setFormData((prevState) => {
                    return { ...prevState, productId: id };
                  });
                  bidPageNotification(
                    "product added successfully",
                    NOTIFICATION_STATES.SUCCESS
                  );
                  setShowProductsPage(false);
                }}
                className="classic-button"
              >
                Choose
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductCard;

import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "./AddNewBidForm.css";
import { UserContext } from "../../../context/User/UserContext";
import { NOTIFICATION_STATES } from "../../Notification/notificationStates";
import { addBid } from "../../../data/api/postingData";
import Products from "../../../pages/MyAccount/Products/Products";

const AddNewBidForm = ({ setAddNewBidForm, updateNotification }) => {
  const { userData } = useContext(UserContext);
  const [user] = userData;

  const [showProductsPage, setShowProductsPage] = useState(false);

  const [formData, setFormData] = useState({
    productId: "",
    bidderId: user.userData.id,
    min_bid: "",
    end_time: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, end_time: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { productId, bidderId, min_bid, end_time } = formData;
    if (!productId) {
      updateNotification("please choose a product", NOTIFICATION_STATES.INFO);
      return;
    }
    if (!end_time) {
      updateNotification(
        "please set the endtime of the bid",
        NOTIFICATION_STATES.INFO
      );
      return;
    }

    const response = await addBid(productId, bidderId, min_bid, end_time);

    if (response.success) {
      updateNotification(response.message, NOTIFICATION_STATES.SUCCESS);
      setTimeout(() => window.location.reload(), 2000);
    } else updateNotification(response.message, NOTIFICATION_STATES.ERROR);
  };

  return (
    <>
      <div className="add-bid-form">
        <h2>Add New Bid</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="productId">Product ID:</label>
          <input
            onClick={() => setShowProductsPage(true)}
            readOnly
            type="number"
            id="productId"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            required
          />

          <label htmlFor="productId">
            {/* Product:{" "} */}
            <span>
              <button
                onClick={() => setShowProductsPage(true)}
                className="classic-button"
                type="button"
              >
                choose product
              </button>
            </span>
          </label>

          <div>
            <label htmlFor="min_bid">Minimum Bid:</label>
            <input
              type="number"
              id="min_bid"
              name="min_bid"
              value={formData.min_bid}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="end_time">End Time:</label>
            <DatePicker
              selected={formData.end_time}
              onChange={handleDateChange}
              showTimeSelect
              dateFormat="Pp"
              minDate={moment().toDate()} // Ensure the selected date is not in the past
            />
          </div>

          <button type="submit" className="classic-button">
            Submit Bid
          </button>

          <button
            onClick={() => setAddNewBidForm(false)}
            className="close-button"
          >
            close
          </button>
        </form>
      </div>
      {showProductsPage && (
        <div className="products_page-container">
          <Products
            setFormData={setFormData}
            setShowProductsPage={setShowProductsPage}
            bidPageNotification={updateNotification}
          />
        </div>
      )}
    </>
  );
};

export default AddNewBidForm;

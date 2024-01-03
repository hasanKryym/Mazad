import React, { useContext, useState } from "react";
import "./PlaceBidForm.css";
import Notification from "../../Notification/Notification";
import { NOTIFICATION_STATES } from "../../Notification/notificationStates";
import { placeBid } from "../../../data/api/postingData";
import { UserContext } from "../../../context/User/UserContext";

const PlaceBidForm = ({
  bidId,
  highestBid,
  setShowPlaceBidForm,
  setHighestBid,
  updateNotification,
  setWinnerData,
}) => {
  const [bidAmount, setBidAmount] = useState(+highestBid + 1);

  const { userData } = useContext(UserContext);
  const [user] = userData;

  const handleBidSubmit = async (e) => {
    e.preventDefault();

    if (bidAmount <= highestBid) {
      updateNotification(
        "please provide a value higher than the minimum bid required",
        NOTIFICATION_STATES.INFO
      );
      return;
    }

    updateNotification("placing bid please wait", NOTIFICATION_STATES.LOAD);
    const response = await placeBid(bidId, bidAmount);

    if (response.success) {
      setWinnerData((prevState) => {
        return { ...prevState, ...user.userData };
      });

      setHighestBid(bidAmount);
      updateNotification(
        "bid placed successfully",
        NOTIFICATION_STATES.SUCCESS
      );
      setShowPlaceBidForm(false);
    } else {
      updateNotification(response.message, NOTIFICATION_STATES.ERROR);
      setShowPlaceBidForm(false);
    }
  };

  return (
    <>
      <div className="place-bid-form-container">
        <button
          className="close-button"
          onClick={() => setShowPlaceBidForm(false)}
        >
          Close
        </button>
        <h2 className="place-bid-form-heading">Place a Bid</h2>
        <form className="place-bid-form" onSubmit={handleBidSubmit}>
          <h5>NOTE: minimum value required &gt; ${highestBid}</h5>
          <label className="place-bid-form-label" htmlFor="bidAmount">
            Bid Amount:
          </label>
          <input
            className="place-bid-form-input"
            type="number"
            id="bidAmount"
            name="bidAmount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            required
          />

          <button className="classic-button" type="submit">
            Place Bid
          </button>
        </form>
      </div>
    </>
  );
};

export default PlaceBidForm;
